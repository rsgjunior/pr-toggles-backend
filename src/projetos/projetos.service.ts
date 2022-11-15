import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { v4 as uuidv4 } from 'uuid';
import { RegrasService } from 'src/regras/regras.service';
import { CalculateFuncionalidadesDto } from './dto/calculate-funcionalidades.dto';

@Injectable()
export class ProjetosService {
  private readonly logger = new Logger(ProjetosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly regrasService: RegrasService,
  ) {}

  async create(createProjetoDto: CreateProjetoDto) {
    this.logger.log('create');

    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: createProjetoDto.cliente_id,
      },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente de ID ${createProjetoDto.cliente_id} não existe.`,
      );
    }

    const projetoDoMesmoClienteComMesmoNome =
      await this.prisma.projeto.findFirst({
        where: {
          cliente_id: createProjetoDto.cliente_id,
          nome: createProjetoDto.nome,
        },
      });

    if (projetoDoMesmoClienteComMesmoNome) {
      throw new HttpException(
        'Já existe um projeto com o mesmo nome para esse cliente',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data: Prisma.ProjetoUncheckedCreateInput = {
      ...createProjetoDto,
      chave: {
        createMany: {
          data: [
            { id: uuidv4(), ambiente: 'dev' },
            { id: uuidv4(), ambiente: 'homolog' },
            { id: uuidv4(), ambiente: 'prod' },
          ],
        },
      },
    };

    return this.prisma.projeto.create({
      data,
      include: {
        chave: true,
        cliente: true,
      },
    });
  }

  async findMany(params: {
    where?: Prisma.ProjetoWhereInput;
    include?: Prisma.ProjetoInclude;
  }) {
    this.logger.log('findMany');

    const { where, include } = params;
    return this.prisma.projeto.findMany({
      where,
      include,
    });
  }

  async findOne(id: number) {
    this.logger.log('findOne');

    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException(`Não existe projeto com o ID ${id}`);
    }

    return projeto;
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    this.logger.log('update');

    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException(`Não existe projeto com o ID ${id}`);
    }

    return this.prisma.projeto.update({
      where: { id },
      data: updateProjetoDto,
    });
  }

  async remove(id: number) {
    this.logger.log('remove');

    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException(`Não existe projeto com o ID ${id}`);
    }

    return this.prisma.projeto.delete({
      where: { id },
    });
  }

  async calculateFuncionalidadesForProjeto(
    calculateFuncionalidadesForProjetoDto: CalculateFuncionalidadesDto,
  ) {
    this.logger.log(
      'calculateFuncionalidadesForProjeto',
      calculateFuncionalidadesForProjetoDto,
    );

    const { chave_ambiente, contexto } = calculateFuncionalidadesForProjetoDto;

    if (!chave_ambiente) {
      throw new BadRequestException(`chave inválida`);
    }

    // Pega a chave para saber de qual projeto e ambiente é
    const chave = await this.prisma.chave.findFirst({
      where: {
        id: chave_ambiente,
      },
    });

    if (!chave) {
      throw new NotFoundException(`A chave ${chave_ambiente} não existe`);
    }

    const { projeto_id, ambiente } = chave;

    // Pega todas as funcionalidades daquele projeto nesse ambiente
    const funcionalidades = await this.prisma.funcionalidade.findMany({
      where: {
        projeto_id,
      },
      include: {
        estrategias: {
          where: {
            ambiente,
          },
          include: {
            estrategia_has_agregado: {
              include: {
                agregado: true,
              },
            },
          },
        },
      },
    });

    //return funcionalidades;

    const result = [];
    for (const funcionalidade of funcionalidades) {
      // se não está ativada nesse ambiente ignora
      if (!funcionalidade[`ativada_${ambiente}`]) {
        continue;
      }

      // verifica se tem segmento de regras
      if (funcionalidade.estrategias[0].estrategia_has_agregado.length) {
        const agregado = funcionalidade.estrategias[0]
          .estrategia_has_agregado[0].agregado.regras as unknown as Agregado;

        // verifica se o contexto passa nas regras
        if (this.regrasService.validarAgregadoDeRegras(agregado, contexto)) {
          // verifica se o valor do segmento tem variação
          if (
            funcionalidade.estrategias[0].estrategia_has_agregado[0].variacoes
          ) {
            // calcula a variação
          }

          // Se não tem variação retorna o valor padrão do segmento
          result.push({
            funcionalidade: funcionalidade.nome,
            valor:
              funcionalidade.estrategias[0].estrategia_has_agregado[0].valor,
          });

          continue; // Pula pra próxima funcionalidade pois já inseriu essa
        }
      }

      // Verifica se o valor tem variação
      if (funcionalidade.estrategias[0].variacoes) {
        // calcula a variação
      }

      // Se não entrou em nenhum dos casos a cima, retorna o valor
      // padrão da estrategia para esse ambiente
      result.push({
        funcionalidade: funcionalidade.nome,
        valor: funcionalidade.estrategias[0].valor,
      });
    }

    return funcionalidades;
  }
}
