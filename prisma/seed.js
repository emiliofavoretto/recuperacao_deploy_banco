import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela exemplo...');

    // Remove todos os registros
    // await prisma.exemplo.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.exemplo.createMany({
        data: [
            { nome: 'Maria', turma: 'DS', materia: 'deploy de banco de dados'},
            { nome: 'João', turma: 'DS', materia: 'deploy de banco de dados'},
            { nome: 'Pedro', turma: 'Mecanica', materia: 'torno' },
            { nome: 'Ana', turma: 'Mecanica', materia: 'torno'},
        ]
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
