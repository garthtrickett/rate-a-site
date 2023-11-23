CREATE TABLE `todo` (
	`id` serial AUTO_INCREMENT,
	`description` varchar(256),
	`completed` boolean DEFAULT false,
	`added_at` timestamp DEFAULT (now())
);
