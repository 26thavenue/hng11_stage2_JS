// import { expect, test, describe, mock, beforeEach } from "bun:test";
// import { createOrg, getAllUsersOrg, getOrgByID, addUsersToOrg } from '../service/org.service'; // adjust the import path as needed
// import { ErrorMiddleware } from "../middlewares/error.middleware";

// // Mock the database
// const mockDb = {
//   organisation: {
//     create: () => {},
//     update: () => {},
//     findMany: () => {},
//     findFirst: () => {},
//     findUnique: () => {},
//   },
//   user: {
//     findUnique: () => {},
//   },
// };

// mock.module("../utils/util", () => ({
//   db: mockDb
// }));

// describe("Organisation functions", () => {
// //   beforeEach(() => {
    
// //     for (const key in mockDb) {
// //       for (const method in mockDb[key]) {
// //         mockDb[key][method] = () => {};
// //       }
// //     }
// //   });

//   describe("createOrg", () => {
//     test("should create an organisation successfully", async () => {
//       const mockOrg = {
//             orgId: 'mock-org-id',
//             name: 'mockorg',
//             description: 'Mock organization for testing',
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             users: [{ id: 'user1' }]
//         };
//       mockDb.organisation.create = () => Promise.resolve(mockOrg);
//       mockDb.organisation.update = () => Promise.resolve(mockOrg);

      

//       const result = await createOrg("Test Org", "user1", "Test Description");

//     //   console.log(result)

//       expect(result).toEqual(mockOrg);
//     });

//     test("should handle errors", async () => {
//       mockDb.organisation.create = () => Promise.reject(new Error("DB Error"));

//       const result = await createOrg("Test Org", "user1");

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(500);
//     });
//   });

//   describe("getAllUsersOrg", () => {
//     test("should return all organisations for a user", async () => {
//       const mockOrgs = 
//       [
//         {
//             orgId: 'mock-org-id',
//             name: 'mockorg',
//             description: 'Mock organization for testing',
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             users: [{ id: 'user1' }]
//         },
//         {
//             orgId: 'mock-org-id-2',
//             name: 'mockOrganisation',
//             description: 'Mock organization for testing 2  ',
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             users: [{ id: 'user1' }]
//         }
//       ];
//       mockDb.organisation.findMany = () => Promise.resolve(mockOrgs);

//       const result = await getAllUsersOrg("user1");


//       expect(result).toEqual(mockOrgs);
//     });

//     test("should handle errors", async () => {
//       mockDb.organisation.findMany = () => Promise.reject(new Error("DB Error"));

//       const result = await getAllUsersOrg("user1");

//     //   console.log(result)

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(500);
//     });
//   });

//   describe("getOrgByID", () => {
//     test("should return an organisation by ID", async () => {
//       const mockOrg = {
//             orgId: 'mock-org-id',
//             name: 'mockorg',
//             description: 'Mock organization for testing',
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             users: [{ id: 'user1' }]
//         };
//       mockDb.organisation.findFirst = () => Promise.resolve(mockOrg);

//       const result = await getOrgByID("org1", "user1");

//       expect(result).toEqual(mockOrg);
//     });

//     test("should return an error if organisation doesn't exist", async () => {
//       mockDb.organisation.findFirst = () => Promise.resolve(null);

//       const result = await getOrgByID("org1", "user1");

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(401);
//     });

//     test("should handle errors", async () => {
//       mockDb.organisation.findFirst = () => Promise.reject(new Error("DB Error"));

//       const result = await getOrgByID("org1", "user1");

//       expect(result).toBeInstanceOf(ErrorMiddleware);
//       expect((result as ErrorMiddleware).statusCode).toBe(500);
//     });
//   });

//   describe("addUsersToOrg", () => {
//     // test("should add a user to an organisation", async () => {
//     //   mockDb.user.findUnique = () => Promise.resolve({ id: "user1" });
//     //   mockDb.organisation.findUnique = () => Promise.resolve({ orgId: "org1" });
//     //   mockDb.organisation.update = () => Promise.resolve({ orgId: "org1", users: [{ id: "user1" }] });

//     //   const result = await addUsersToOrg("org1", "user1");

//     //   expect(result).toBeUndefined();
//     // });

//     // test("should return an error if user doesn't exist", async () => {
//     //   mockDb.user.findUnique = () => Promise.resolve(null);

//     //   const result = await addUsersToOrg("org1", "user1");

//     //   console.log(
//     //     {
//     //         "result":result
//     //     }
//     //   )

//     //   expect(result).toBeInstanceOf(ErrorMiddleware);
//     //   expect((result as ErrorMiddleware).statusCode).toBe(401);
//     // });

//     // test("should return an error if organisation doesn't exist", async () => {
//     //   mockDb.user.findUnique = () => Promise.resolve({ id: "user1" });
//     //   mockDb.organisation.findUnique = () => Promise.resolve(null);

//     //   const result = await addUsersToOrg("org1", "user1");

//     //   expect(result).toBeInstanceOf(ErrorMiddleware);
//     //   expect((result as ErrorMiddleware).statusCode).toBe(401);
//     // });

   
//   });
// });