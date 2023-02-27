create table event (
	`i` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`id` varchar(32) NOT NULL UNIQUE,
	`start` datetime(3),
	`summary` varchar(255) NOT NULL,
	`description` TEXT(4096) NOT NULL,
	`duration` mediumint unsigned NOT NULL,
	`location` JSON,
	`sequence` mediumint DEFAULT 1,
	`url` varchar(2048),
	`meta` JSON,
	`attachments` JSON,
	`attendees` JSON,
	`alarms` JSON,
	`categories` JSON,

	`s` tinyint unsigned NOT NULL DEFAULT '0',
	`cby` bigint unsigned NOT NULL,
	`uby` int unsigned DEFAULT NULL,
	`cat` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`uat` datetime(3) NOT NULL,
	FULlTEXT summary_ft (summary),
	FULlTEXT desc_ft (description)
);

insert into event (`id`, `start`, `summary`, `description`, `location`, `duration`, `alarms`, `s`, `cby`, `cat`, `uat`) values
(
'seed-202302261719',
'2023-02-22 10:35:00',
'Access-A-Ride Pickup', 
'Access-A-Ride trip to 900 Jay St., Brooklyn',
'{"title":"1000 Broadway Ave., Brooklyn"}',
60,
'[{"trigger":600,"DESCRIPTION":"Pickup Reminder","type":"display"}]',
1, 0, NOW(), NOW()
),
(
'seed-202302270039',
'2023-02-22 20:00:00',
'Access-A-Ride Pickup', 
'Access-A-Ride trip to 900 Jay St., Brooklyn',
'{"title":"900 Jay St., Brooklyn"}',
60,
'[{"trigger":600,"DESCRIPTION":"Pickup Reminder","type":"display"}]',
1, 0, NOW(), NOW()
);
