// import { v4 as uuidv4 } from 'uuid';
// import { createOrg, getAllUsersOrg, getOrgByID, addUsersToOrg } from '../service/org.service';
// import { ErrorMiddleware } from "../middlewares/error.middleware";

// import { beforeEach, describe, it, jest, expect } from '@jest/globals';
// import { Organisation, User } from '../interfaces';  // Adjust the import path as necessary

// interface MockDb {
//   organisation: {
//     create: jest.Mock;
//     update: jest.Mock;
//     findMany: jest.Mock;
//     findFirst: jest.Mock;
//     findUnique: jest.Mock;
//   };
//   user: {
//     findUnique: jest.Mock;
//   };
// }

// const mockDb:MockDb = {
//   organisation: {
//     create: jest.fn(),
//     update: jest.fn(),
//     findMany: jest.fn(),
//     findFirst: jest.fn(),
//     findUnique: jest.fn(),
//   },
//   user: {
//     findUnique: jest.fn(),
//   },
// };

// jest.mock("../utils/util", () => ({
//   db: mockDb
// }));

// describe("Organisation functions", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("createOrg", () => {
//     test("should create an organisation successfully", async () => {
//       const mockOrg: Organisation = {
//         orgId: uuidv4(),
//         name: 'mockorg',
//         description: 'Mock organization for testing',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         users: [{ id: uuidv4() } as User]
//       };
      
//        mockDb.organisation.create.mockResolvedValue(mockOrg);
//       mockDb.organisation.update.mockResolvedValue(mockOrg);

//       const result = await createOrg("Test Org", uuidv4(), "Test Description");

//       expect(result).toEqual(mockOrg);
//     });

//     test("should handle errors", async () => {
//       mockDb.organisation.create.mockRejectedValue(new Error("DB Error"));

//       const result = await createOrg("Test Org", uuidv4());

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(500);
//     });
//   });

//   describe("getAllUsersOrg", () => {
//     test("should return all organisations for a user", async () => {
//       const mockOrgs: Organisation[] = [
//         {
//           orgId: uuidv4(),
//           name: 'mockorg',
//           description: 'Mock organization for testing',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           users: [{ id: uuidv4() } as User]
//         },
//         {
//           orgId: uuidv4(),
//           name: 'mockOrganisation',
//           description: 'Mock organization for testing 2',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           users: [{ id: uuidv4() } as User]
//         }
//       ];
//       mockDb.organisation.findMany.mockResolvedValue(mockOrgs);

//       const result = await getAllUsersOrg(uuidv4());

//       expect(result).toEqual(mockOrgs);
//     });

//     test("should handle errors", async () => {
//       mockDb.organisation.findMany.mockRejectedValue(new Error("DB Error"));

//       const result = await getAllUsersOrg(uuidv4());

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(500);
//     });
//   });

//   describe("getOrgByID", () => {
//     test("should return an organisation by ID", async () => {
//       const mockOrg: Organisation = {
//         orgId: uuidv4(),
//         name: 'mockorg',
//         description: 'Mock organization for testing',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         users: [{ id: uuidv4() } as User]
//       };
//       mockDb.organisation.findFirst.mockResolvedValue(mockOrg);

//       const result = await getOrgByID(uuidv4(), uuidv4());

//       expect(result).toEqual(mockOrg);
//     });

//     test("should return an error if organisation doesn't exist", async () => {
//       mockDb.organisation.findFirst.mockResolvedValue(null);

//       const result = await getOrgByID(uuidv4(), uuidv4());

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(401);
//     });

//     test("should handle errors", async () => {
//       mockDb.organisation.findFirst.mockRejectedValue(new Error("DB Error"));

//       const result = await getOrgByID(uuidv4(), uuidv4());

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(500);
//     });
//   });

//   describe("addUsersToOrg", () => {
//     test("should add a user to an organisation", async () => {
//       const userId = uuidv4();
//       const orgId = uuidv4();
//       mockDb.user.findUnique.mockResolvedValue({ id: userId } as User);
//       mockDb.organisation.findUnique.mockResolvedValue({ orgId: orgId } as Organisation);
//       mockDb.organisation.update.mockResolvedValue({ orgId: orgId, users: [{ id: userId }] } as Organisation);

//       const result = await addUsersToOrg(orgId, userId);

//       expect(result).toBeUndefined();
//     });

//     test("should return an error if user doesn't exist", async () => {
//       mockDb.user.findUnique.mockResolvedValue(null);

//       const result = await addUsersToOrg(uuidv4(), uuidv4());

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(401);
//     });

//     test("should return an error if organisation doesn't exist", async () => {
//       mockDb.user.findUnique.mockResolvedValue({ id: uuidv4() } as User);
//       mockDb.organisation.findUnique.mockResolvedValue(null);

//       const result = await addUsersToOrg(uuidv4(), uuidv4());

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(401);
//     });
//   });
// });
