ALTER TABLE `organisation` MODIFY COLUMN `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `professionalOrganisationMapping` MODIFY COLUMN `professionalId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `professionalOrganisationMapping` MODIFY COLUMN `organisationId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `professional` MODIFY COLUMN `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `professionalOrganisationMapping` ADD CONSTRAINT `professionalOrganisationMapping_professionalId_professional_id_fk` FOREIGN KEY (`professionalId`) REFERENCES `professional`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `professionalOrganisationMapping` ADD CONSTRAINT `professionalOrganisationMapping_organisationId_organisation_id_fk` FOREIGN KEY (`organisationId`) REFERENCES `organisation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `professionalOrganisationMapping` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `organisation` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `professionalOrganisationMapping` ADD PRIMARY KEY(`professionalId`,`organisationId`);--> statement-breakpoint
ALTER TABLE `professional` ADD PRIMARY KEY(`id`);