ALTER TABLE `organisationReview` MODIFY COLUMN `commonReviewFieldsId` int;--> statement-breakpoint
ALTER TABLE `organisationReview` MODIFY COLUMN `organisationId` int;--> statement-breakpoint
ALTER TABLE `professionalReview` MODIFY COLUMN `commonReviewFieldsId` int;--> statement-breakpoint
ALTER TABLE `professionalReview` MODIFY COLUMN `professionalId` int;--> statement-breakpoint
ALTER TABLE `organisationReview` ADD `customerId` int;--> statement-breakpoint
ALTER TABLE `professionalReview` ADD `customerId` int;--> statement-breakpoint
ALTER TABLE `commonReviewFields` DROP COLUMN `customerId`;