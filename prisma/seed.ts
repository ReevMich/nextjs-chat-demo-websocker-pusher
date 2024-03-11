import prisma from '../lib/prisma';

async function main() {
    const response = await Promise.all([
        prisma.chatRoom.upsert({
            create: {
                id: "aaaaaa-aaaaa-aaaaa-aaaaa-aaaaa",
                name: "Test Chat Room",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            update: {},
            where: { id: "aaaaaa-aaaaa-aaaaa-aaaaa-aaaaa" },
        }),
        prisma.chatRoom.upsert({
            create: {
                id: "pvaaaa-aaaaa-aaaaa-aaaaa-aaaaa",
                name: "Test Chat Room",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            update: {},
            where: { id: "pvaaaa-aaaaa-aaaaa-aaaaa-aaaaa" },
        })
    ])
    console.log(response)
}

main()
.then(async () => {
    prisma?.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma?.$disconnect()
    process.exit(1);
})