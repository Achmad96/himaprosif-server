import { Test, TestingModule } from "@nestjs/testing";

import { AuthService } from "@/auth/auth.service";
import { PrismaService } from "@/prisma.service";

import { UnauthorizedException } from "@nestjs/common";

const admin = [
    {
        id: 1,
        username: "anis01",
        name: "Anies",
        password: "$2a$12$i1OaLkTzVbi6YGBpTUGFt.wpLHgHANYSwJohg9LGr2xv0OCX3flV2",
    },
    {
        id: 2,
        username: "prabowo02",
        name: "Prabowo",
        password: "$2a$12$kAHZs2qQmNaEKKILcwGJre0u1CfvWPCTC.6WwyD/XA.mO2kZ1yeqi",
    },
    {
        id: 3,
        username: "ganjar03",
        name: "Ganjar",
        password: "$2a$12$C4AXk7KQyWLZMwImzaTFFeeazN4X83kwhtkOHxLo5i20O/L6.QDhW",
    },
];
const firstAdmin = admin[0];
const db = {
    admin: {
        findMany: jest.fn().mockResolvedValue(admin),
        findUnique: jest.fn().mockResolvedValue(firstAdmin),
        create: jest.fn().mockReturnValue(firstAdmin),
        update: jest.fn().mockResolvedValue(firstAdmin),
        delete: jest.fn().mockResolvedValue(firstAdmin),
    },
};

describe("Auth Service", () => {
    let service: AuthService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: db,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe("signIn function", () => {
        it("should pass", async () => {
            const result = await service.signIn("anis01", "27");
            expect(result).toBeDefined();
        });

        it("should reject", async () => {
            expect(async () => {
                await service.signIn("prabowo02", "58");
            }).rejects.toThrow(new UnauthorizedException());
        });
    });
});
