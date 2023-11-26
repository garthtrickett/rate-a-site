CREATE TABLE `professionalOrganisationMapping` (
	`professionalId` int NOT NULL,
	`organisationId` int NOT NULL,
	CONSTRAINT `professionalOrganisationMapping_professionalId_organisationId_pk` PRIMARY KEY(`professionalId`,`organisationId`)
);
--> statement-breakpoint
ALTER TABLE `professional` DROP COLUMN `organisationId`;--> statement-breakpoint
ALTER TABLE `professionalOrganisationMapping` ADD CONSTRAINT `professionalOrganisationMapping_professionalId_professional_id_fk` FOREIGN KEY (`professionalId`) REFERENCES `professional`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `professionalOrganisationMapping` ADD CONSTRAINT `professionalOrganisationMapping_organisationId_organisation_id_fk` FOREIGN KEY (`organisationId`) REFERENCES `organisation`(`id`) ON DELETE no action ON UPDATE no action;