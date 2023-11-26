CREATE TABLE `commonReviewFields` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`rating` int,
	`comments` varchar(1024),
	CONSTRAINT `commonReviewFields_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `organisationReview` MODIFY COLUMN `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `organisationReview` MODIFY COLUMN `organisationId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `professionalReview` MODIFY COLUMN `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `professionalReview` MODIFY COLUMN `professionalId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `organisationReview` ADD `commonReviewFieldsId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `professionalReview` ADD `commonReviewFieldsId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `organisationReview` DROP COLUMN `customerId`;--> statement-breakpoint
ALTER TABLE `organisationReview` DROP COLUMN `rating`;--> statement-breakpoint
ALTER TABLE `organisationReview` DROP COLUMN `comments`;--> statement-breakpoint
ALTER TABLE `professionalReview` DROP COLUMN `customerId`;--> statement-breakpoint
ALTER TABLE `professionalReview` DROP COLUMN `rating`;--> statement-breakpoint
ALTER TABLE `professionalReview` DROP COLUMN `comments`;--> statement-breakpoint
ALTER TABLE `organisationReview` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `professionalReview` ADD PRIMARY KEY(`id`);