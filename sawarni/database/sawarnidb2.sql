-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2025 at 10:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sawarnidb2`
--

-- --------------------------------------------------------

--
-- Table structure for table `courseattachment`
--

CREATE TABLE `courseattachment` (
  `course_id` int(11) NOT NULL,
  `upload_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courseattachment`
--

INSERT INTO `courseattachment` (`course_id`, `upload_id`) VALUES
(15, 38),
(16, 40),
(17, 42),
(17, 43),
(17, 44),
(18, 46),
(18, 47),
(18, 48),
(19, 50),
(19, 51),
(19, 52);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` float(10,5) NOT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `thumbnail_upload_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `price`, `creator_id`, `thumbnail_upload_id`) VALUES
(15, 'Course 1', 'course 1 description', 155.00000, 1, 37),
(16, 'Course 1', 'course 1 description', 155.00000, 1, 39),
(17, 'azdadz', 'dzadaz', 145.00000, 2, 41),
(18, 'azdadz', 'dzadaz', 145.00000, 2, 45),
(19, 'azdadz', 'dzadaz', 145.00000, 2, 49);

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `sellerId` int(11) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `price` float(100,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `name`, `sellerId`, `description`, `price`) VALUES
(1, 'rza za', 2, 'dzadza dza', 10.25),
(2, 'bg re', 1, 'dzad azdazdaz dza', 121.50),
(3, 'ezf ', 1, 'zefez', 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `equipmentattachment`
--

CREATE TABLE `equipmentattachment` (
  `equipmentId` int(11) NOT NULL,
  `uploadId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipmentattachment`
--

INSERT INTO `equipmentattachment` (`equipmentId`, `uploadId`) VALUES
(2, 54),
(2, 55),
(3, 56);

-- --------------------------------------------------------

--
-- Table structure for table `liked`
--

CREATE TABLE `liked` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `like_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `liked`
--

INSERT INTO `liked` (`user_id`, `post_id`, `like_datetime`) VALUES
(1, 1, '2025-04-11 10:41:12'),
(1, 3, '2025-04-16 00:20:29'),
(1, 4, '2025-04-14 00:27:16'),
(1, 5, '2025-04-11 10:21:07'),
(1, 11, '2025-05-07 10:12:37'),
(3, 1, '2025-04-10 22:38:13'),
(3, 3, '2025-04-10 22:38:15'),
(3, 4, '2025-04-10 22:38:12'),
(3, 8, '2025-04-10 22:38:18');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `senderid` int(11) NOT NULL,
  `receiverid` int(11) NOT NULL,
  `content` varchar(512) NOT NULL,
  `sent_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `senderid`, `receiverid`, `content`, `sent_at`) VALUES
(4, 1, 2, 'hello', '2025-04-11 00:34:46'),
(5, 1, 3, 'hi', '2025-04-11 00:35:12'),
(6, 1, 5, 'aa', '2025-04-11 00:37:12'),
(7, 1, 10, 'ddd', '2025-04-11 00:37:33'),
(8, 2, 1, 'hi', '2025-04-11 08:48:53'),
(9, 1, 2, 'good morning', '2025-04-11 08:49:01'),
(10, 2, 1, 'aa', '2025-04-11 08:49:13'),
(11, 1, 2, 'aaa', '2025-04-14 00:30:48'),
(12, 1, 2, 'aaa', '2025-04-14 00:30:55'),
(13, 1, 2, 'aa', '2025-04-14 00:31:00'),
(14, 1, 2, 'tttt', '2025-04-14 00:31:05'),
(15, 1, 2, 'aaa', '2025-04-14 00:31:12'),
(16, 1, 2, 'aaa', '2025-04-14 00:31:25'),
(17, 1, 2, 'aaa', '2025-04-14 00:31:39'),
(18, 1, 2, 'aa', '2025-04-14 00:33:01'),
(19, 2, 1, 'hhh', '2025-04-14 00:36:15'),
(20, 2, 2, 'hhh', '2025-04-14 00:36:27'),
(21, 1, 2, 'aaa', '2025-04-14 00:36:39'),
(22, 1, 10, 'aa', '2025-04-14 01:10:41'),
(23, 1, 10, 'aaa', '2025-04-14 01:10:44'),
(24, 2, 2, 'dazyu dhzadg ydazdaz', '2025-04-27 20:30:25'),
(25, 2, 2, 'fejhz zudha dhjuaz dazuddzaoiu dhdazuio hd', '2025-04-27 20:30:33'),
(26, 1, 2, 'duaz gdyhazg dujazghd zdgy azgduyi dhazodaz', '2025-04-27 20:32:27'),
(27, 1, 2, 'dzahg adhuiazgy dujazhdu gdzytfd zdoaiug', '2025-04-27 20:32:33');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `posted_by` int(11) NOT NULL,
  `text_content` varchar(1000) NOT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `creation_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `posted_by`, `text_content`, `image_url`, `creation_date`) VALUES
(3, 2, 'fedzfgr gter g faef  razf za azdza ', NULL, '2025-04-10'),
(4, 2, 'hjfdhe bfhae vazgd iojdaz', NULL, '2025-04-10'),
(5, 2, 'fjuia fbghaf tvgaz', NULL, '2025-04-10'),
(8, 3, 'video', NULL, '2025-04-10');

-- --------------------------------------------------------

--
-- Table structure for table `postattachment`
--

CREATE TABLE `postattachment` (
  `post_id` int(11) DEFAULT NULL,
  `upload_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postattachment`
--

INSERT INTO `postattachment` (`post_id`, `upload_id`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 4),
(3, 5),
(4, 6),
(4, 7),
(5, 8),
(6, 9),
(7, 10),
(8, 11),
(9, 12),
(9, 13),
(10, 14),
(11, 15),
(12, 53),
(13, 57);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`course_id`, `user_id`, `timestamp`) VALUES
(1, 1, NULL),
(1, 3, NULL),
(14, 1, NULL),
(15, 1, NULL),
(15, 2, NULL),
(16, 1, NULL),
(17, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `upload`
--

CREATE TABLE `upload` (
  `upload_id` int(11) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `upload`
--

INSERT INTO `upload` (`upload_id`, `file_path`, `file_type`) VALUES
(1, 'uploads/pexels-donaldtong94-55787.jpg', 'jpg'),
(2, 'uploads/pexels-photo-212324.webp', 'webp'),
(3, 'uploads/pexels-lum3n-44775-167684.jpg', 'jpg'),
(4, 'uploads/pexels-freestockpro-1227513.jpg', 'jpg'),
(5, 'uploads/pexels-lum3n-44775-167684.jpg', 'jpg'),
(6, 'uploads/pexels-brett-sayles-1431822.jpg', 'jpg'),
(7, 'uploads/pexels-eberhardgross-1367105.jpg', 'jpg'),
(8, 'uploads/pexels-lum3n-44775-167684.jpg', 'jpg'),
(9, 'uploads/vd.mp4', 'mp4'),
(10, 'uploads/pexels-brett-sayles-1431822.jpg', 'jpg'),
(11, 'uploads/vd.mp4', 'mp4'),
(12, 'uploads/2023-11-12_17-18-35.png', 'png'),
(13, 'uploads/2023-11-18_14-34-58.png', 'png'),
(14, 'uploads/vd.mp4', 'mp4'),
(15, 'uploads/logo_dark.png', 'png'),
(16, 'uploads/pdf1.pdf', 'pdf'),
(37, 'uploads/course1.webp', 'webp'),
(38, 'uploads/pexels-creative-vix-9754.jpg', 'jpg'),
(39, 'uploads/course1.webp', 'webp'),
(40, 'uploads/pexels-creative-vix-9754.jpg', 'jpg'),
(41, 'uploads/signal-2025-04-05-164406_005.jpeg', 'jpeg'),
(42, 'uploads/481035484_8933466520096423_4647936741498567879_n.mp4', 'mp4'),
(43, 'uploads/cv_mehdi_bouzeffour (1) (1).pdf', 'pdf'),
(44, 'uploads/cv_mehdi_bouzeffour (1).pdf', 'pdf'),
(45, 'uploads/signal-2025-04-05-164406_005.jpeg', 'jpeg'),
(46, 'uploads/481035484_8933466520096423_4647936741498567879_n.mp4', 'mp4'),
(47, 'uploads/cv_mehdi_bouzeffour (1) (1).pdf', 'pdf'),
(48, 'uploads/cv_mehdi_bouzeffour (1).pdf', 'pdf'),
(49, 'uploads/signal-2025-04-05-164406_005.jpeg', 'jpeg'),
(50, 'uploads/481035484_8933466520096423_4647936741498567879_n.mp4', 'mp4'),
(51, 'uploads/cv_mehdi_bouzeffour (1) (1).pdf', 'pdf'),
(52, 'uploads/cv_mehdi_bouzeffour (1).pdf', 'pdf'),
(53, 'uploads/WhatsApp Image 2025-05-02 à 22.45.34_75f4fa44.jpg', 'jpg'),
(54, 'uploads/WhatsApp Image 2025-05-02 à 22.45.33_c00b4e69.jpg', 'jpg'),
(55, 'uploads/WhatsApp Image 2025-05-02 à 22.45.34_75f4fa44.jpg', 'jpg'),
(56, 'uploads/WhatsApp Image 2025-05-02 à 22.45.34_75f4fa44.jpg', 'jpg'),
(57, 'uploads/video3.mp4', 'mp4');

-- --------------------------------------------------------

--
-- Table structure for table `useraccount`
--

CREATE TABLE `useraccount` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `join_date` date NOT NULL,
  `profile_picture_path` varchar(256) NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  `password` varchar(20) NOT NULL DEFAULT '0000',
  `aboutMe` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`user_id`, `user_name`, `join_date`, `profile_picture_path`, `location`, `password`, `aboutMe`) VALUES
(1, 'john_doe', '2022-01-15', 'uploads/image1.png', 'New York', '0000', ''),
(2, 'jane_smith', '2021-11-05', 'uploads/image1.png', 'Los Angeles', '0000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis, magna at condimentum viverra, libero sapien cursus velit, ac dignissim nulla libero et metus. Suspendisse potenti. Aliquam erat volutpat. Nunc in suscipit turpis. Vivamus auctor orci in risus congue, ut malesuada nulla fringilla. Nam at mauris nec mi consequat lobortis. Nulla ultricies tincidunt augue, ut malesuada sem vestibulum nec. Mauris egestas tortor at ipsum egestas, ac cursus est ullamcorper.'),
(3, 'mike_jones', '2023-03-22', 'uploads/image1.png', 'Chicago', '0000', ''),
(4, 'sarah_wilson', '2022-07-30', 'uploads/image1.png', 'Miami', '0000', ''),
(5, 'alex_green', '2023-01-10', 'uploads/image1.png', 'Seattle', '0000', ''),
(6, 'emily_brown', '2021-09-18', 'uploads/image1.png', 'Boston', '0000', ''),
(7, 'david_clark', '2022-05-12', 'uploads/image1.png', 'Austin', '0000', ''),
(8, 'lisa_taylor', '2023-02-28', 'uploads/image1.png', 'Denver', '0000', ''),
(9, 'kevin_lee', '2021-12-25', 'uploads/image1.png', 'San Francisco', '0000', ''),
(10, 'amy_adams', '2022-08-07', 'uploads/image1.png', 'Portland', '0000', ''),
(14, 'hukl', '2025-05-04', 'uploads/WhatsApp Image 2025-05-02 à 22.46.00_153c6b36.jpg', 'ben arous', '1111', 'tt'),
(17, 'test', '2025-05-04', 'uploads/signal-2025-04-05-164406_003.jpeg', 'Tunis', '5555', 'gbbg');

-- --------------------------------------------------------

--
-- Table structure for table `userresume`
--

CREATE TABLE `userresume` (
  `userId` int(11) NOT NULL,
  `uploadId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courseattachment`
--
ALTER TABLE `courseattachment`
  ADD PRIMARY KEY (`course_id`,`upload_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipmentattachment`
--
ALTER TABLE `equipmentattachment`
  ADD PRIMARY KEY (`equipmentId`,`uploadId`);

--
-- Indexes for table `liked`
--
ALTER TABLE `liked`
  ADD PRIMARY KEY (`user_id`,`post_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post_user` (`posted_by`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`course_id`,`user_id`);

--
-- Indexes for table `upload`
--
ALTER TABLE `upload`
  ADD PRIMARY KEY (`upload_id`);

--
-- Indexes for table `useraccount`
--
ALTER TABLE `useraccount`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `uc_user_name` (`user_name`);

--
-- Indexes for table `userresume`
--
ALTER TABLE `userresume`
  ADD PRIMARY KEY (`userId`,`uploadId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `upload`
--
ALTER TABLE `upload`
  MODIFY `upload_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `useraccount`
--
ALTER TABLE `useraccount`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_user` FOREIGN KEY (`posted_by`) REFERENCES `useraccount` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
