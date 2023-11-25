CREATE TABLE `customer` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(256)
);
--> statement-breakpoint
CREATE TABLE `organisationReview` (
	`id` serial AUTO_INCREMENT,
	`customerId` int,
	`organisationId` int,
	`rating` int,
	`comments` varchar(1024)
);
--> statement-breakpoint
CREATE TABLE `organisation` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(256)
);
--> statement-breakpoint
CREATE TABLE `professionalReview` (
	`id` serial AUTO_INCREMENT,
	`customerId` int,
	`professionalId` int,
	`rating` int,
	`comments` varchar(1024)
);
--> statement-breakpoint
CREATE TABLE `professional` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(256),
	`organisationId` int
);
--> statement-breakpoint
DROP TABLE `todo`;