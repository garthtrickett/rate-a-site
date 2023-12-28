"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professionalReviewsRelations = exports.organisationReviewsRelations = exports.commonReviewFieldsRelations = exports.professionalReviews = exports.organisationReviews = exports.commonReviewFields = exports.customersRelations = exports.customers = exports.organisationsRelations = exports.professionalsRelations = exports.professionalOrganisationMappingRelations = exports.professionalOrganisationMapping = exports.professionals = exports.organisations = void 0;
// drizzle/schema.js
var mysql_core_1 = require("drizzle-orm/mysql-core");
var drizzle_orm_1 = require("drizzle-orm");
exports.organisations = (0, mysql_core_1.mysqlTable)('organisation', {
    id: (0, mysql_core_1.serial)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 256 })
    // add other fields as necessary
});
exports.professionals = (0, mysql_core_1.mysqlTable)('professional', {
    id: (0, mysql_core_1.serial)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 256 })
    // add other fields as necessary
});
exports.professionalOrganisationMapping = (0, mysql_core_1.mysqlTable)('professionalOrganisationMapping', {
    professionalId: (0, mysql_core_1.int)('professionalId').notNull(),
    organisationId: (0, mysql_core_1.int)('organisationId').notNull()
}, function (t) { return ({
    pk: (0, mysql_core_1.primaryKey)({ columns: [t.professionalId, t.organisationId] })
}); });
exports.professionalOrganisationMappingRelations = (0, drizzle_orm_1.relations)(exports.professionalOrganisationMapping, function (_a) {
    var one = _a.one;
    return ({
        professional: one(exports.professionals, {
            fields: [exports.professionalOrganisationMapping.professionalId],
            references: [exports.professionals.id]
        }),
        organisation: one(exports.organisations, {
            fields: [exports.professionalOrganisationMapping.organisationId],
            references: [exports.organisations.id]
        })
    });
});
// Mapping from the individual tablex to the join table
exports.professionalsRelations = (0, drizzle_orm_1.relations)(exports.professionals, function (_a) {
    var many = _a.many;
    return ({
        professionalOrganisationMappings: many(exports.professionalOrganisationMapping)
    });
});
exports.organisationsRelations = (0, drizzle_orm_1.relations)(exports.organisations, function (_a) {
    var many = _a.many;
    return ({
        professionalOrganisationMappings: many(exports.professionalOrganisationMapping)
    });
});
exports.customers = (0, mysql_core_1.mysqlTable)('customer', {
    id: (0, mysql_core_1.serial)('id'),
    name: (0, mysql_core_1.varchar)('name', { length: 256 })
    // add other fields as necessary
});
exports.customersRelations = (0, drizzle_orm_1.relations)(exports.customers, function (_a) {
    var many = _a.many;
    return ({
        organisationReviews: many(exports.organisationReviews),
        professionalReviews: many(exports.professionalReviews)
    });
});
exports.commonReviewFields = (0, mysql_core_1.mysqlTable)('commonReviewFields', {
    id: (0, mysql_core_1.serial)('id').primaryKey().autoincrement(),
    rating: (0, mysql_core_1.int)('rating'),
    comments: (0, mysql_core_1.varchar)('comments', { length: 1024 })
});
exports.organisationReviews = (0, mysql_core_1.mysqlTable)('organisationReview', {
    id: (0, mysql_core_1.serial)('id').primaryKey().autoincrement(),
    commonReviewFieldsId: (0, mysql_core_1.int)('commonReviewFieldsId'),
    organisationId: (0, mysql_core_1.int)('organisationId'),
    customerId: (0, mysql_core_1.int)('customerId')
});
exports.professionalReviews = (0, mysql_core_1.mysqlTable)('professionalReview', {
    id: (0, mysql_core_1.serial)('id').primaryKey().autoincrement(),
    professionalId: (0, mysql_core_1.int)('professionalId'),
    commonReviewFieldsId: (0, mysql_core_1.int)('commonReviewFieldsId'),
    customerId: (0, mysql_core_1.int)('customerId')
});
exports.commonReviewFieldsRelations = (0, drizzle_orm_1.relations)(exports.commonReviewFields, function (_a) {
    var one = _a.one;
    return ({
        organisationReview: one(exports.organisationReviews, {
            fields: [exports.commonReviewFields.id],
            references: [exports.organisationReviews.commonReviewFieldsId]
        }),
        professionalReview: one(exports.professionalReviews, {
            fields: [exports.commonReviewFields.id],
            references: [exports.professionalReviews.commonReviewFieldsId]
        })
    });
});
exports.organisationReviewsRelations = (0, drizzle_orm_1.relations)(exports.organisationReviews, function (_a) {
    var one = _a.one;
    return ({
        commonReviewFields: one(exports.commonReviewFields, {
            fields: [exports.organisationReviews.commonReviewFieldsId],
            references: [exports.commonReviewFields.id]
        }),
        customer: one(exports.customers, {
            fields: [exports.organisationReviews.commonReviewFieldsId],
            references: [exports.customers.id]
        })
    });
});
exports.professionalReviewsRelations = (0, drizzle_orm_1.relations)(exports.professionalReviews, function (_a) {
    var one = _a.one;
    return ({
        commonReviewFields: one(exports.commonReviewFields, {
            fields: [exports.professionalReviews.commonReviewFieldsId],
            references: [exports.commonReviewFields.id]
        }),
        customer: one(exports.customers, {
            fields: [exports.professionalReviews.commonReviewFieldsId],
            references: [exports.customers.id]
        })
    });
});
