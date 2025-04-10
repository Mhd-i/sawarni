-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 08:22 AM
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
(1, 41, '2025-04-09 12:08:14'),
(2, 41, '2025-04-09 13:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `senderid` int(11) NOT NULL,
  `receiverid` int(11) NOT NULL,
  `content` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `senderid`, `receiverid`, `content`) VALUES
(2, 1, 2, 'hello'),
(3, 1, 2, 'hello'),
(4, 1, 2, 'hello'),
(5, 1, 2, 'hello'),
(6, 1, 2, 'hello'),
(7, 2, 2, 'guten tag'),
(8, 2, 2, 'guten tag'),
(9, 2, 2, 'guten tag'),
(10, 2, 2, 'guten tag'),
(11, 2, 1, 'guten tag'),
(12, 2, 1, 'guten tag'),
(13, 2, 1, 'guten tag'),
(14, 2, 1, 'guten tag'),
(15, 2, 1, 'guten tag'),
(16, 2, 1, 'guten tag'),
(17, 2, 1, 'guten tag'),
(18, 2, 2, 'guten tag'),
(19, 2, 2, 'guten tag'),
(20, 2, 2, 'guten tag'),
(21, 2, 2, 'guten tag'),
(22, 2, 2, 'guten tag'),
(23, 2, 2, 'guten tag'),
(24, 2, 2, 'guten tag'),
(25, 2, 2, 'guten tag'),
(26, 2, 2, 'guten tag'),
(27, 2, 2, 'guten tag'),
(28, 2, 2, 'guten tag'),
(29, 2, 2, 'guten tag'),
(30, 1, 2, 'aa bb cc'),
(31, 1, 2, 'aa bb cc'),
(32, 1, 2, 'aa bb cc'),
(33, 1, 2, 'aa bb cc'),
(34, 1, 2, 'aa bb cc'),
(35, 2, 1, 'my name is'),
(36, 2, 1, 'my name is'),
(37, 2, 1, 'my name is'),
(38, 2, 1, 'my name is'),
(39, 1, 2, 'my name is'),
(40, 1, 2, 'hello'),
(41, 2, 1, 'my name is a nigga'),
(42, 1, 2, 'hi nigga'),
(43, 2, 1, 'HHHHH'),
(44, 1, 2, 'aaa'),
(45, 2, 1, 'aa'),
(46, 2, 2, 'yyy'),
(47, 3, 1, 'aa'),
(48, 3, 1, 'aa'),
(49, 3, 1, 'aa'),
(50, 3, 4, 'bb'),
(51, 3, 1, 'aa'),
(52, 3, 1, 'p'),
(53, 3, 1, 't'),
(54, 3, 1, 'a'),
(55, 3, 2, 'xx'),
(56, 3, 4, 'cc'),
(57, 3, 4, 'aa'),
(58, 3, 2, 'dd'),
(59, 3, 1, 'xx'),
(60, 1, 2, 'aa'),
(61, 1, 2, 'aa'),
(62, 1, 2, 'aa'),
(63, 1, 2, 'aa'),
(64, 1, 2, 'aa'),
(65, 1, 2, 'xx'),
(66, 0, 1, 'aaa'),
(67, 2, 1, 'aaa'),
(68, 2, 1, 'aaa'),
(69, 2, 1, 'aaa'),
(70, 2, 1, 'aaa'),
(71, 2, 1, 'aaa'),
(72, 2, 1, 'aaa'),
(73, 2, 1, 'aa'),
(74, 2, 1, 'aa'),
(75, 2, 1, 'aa'),
(76, 2, 1, 'aaa'),
(77, 2, 1, 'aaa'),
(78, 2, 1, 'aaaddd'),
(79, 2, 1, 'aaaddde'),
(80, 2, 1, 'aa'),
(81, 2, 1, 'aaa'),
(82, 2, 1, 'hello'),
(83, 1, 2, 'aa'),
(84, 2, 1, 'nigga'),
(85, 2, 1, 'nigga'),
(86, 1, 2, 'aa'),
(87, 1, 2, 'aa'),
(88, 1, 1, 'aa'),
(89, 2, 1, 'aaa'),
(90, 1, 2, 'nigga'),
(91, 2, 1, 'aaa'),
(92, 1, 2, 'nigga'),
(93, 2, 1, 'aa'),
(94, 2, 1, 'hello'),
(95, 2, 1, 'aa'),
(96, 2, 1, 'a'),
(97, 2, 1, 'aa'),
(98, 2, 1, 'aaa'),
(99, 2, 1, 'aaa'),
(100, 2, 1, 'aaa'),
(101, 2, 1, 'aa'),
(102, 2, 1, 'd'),
(103, 2, 1, 'aa'),
(104, 1, 1, 'aa'),
(105, 1, 2, 'ddd');

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
(41, 2, 'tiroaza', NULL, '2025-04-05'),
(42, 2, 'jane', NULL, '2025-04-05'),
(43, 1, 'hello', NULL, '2025-04-08'),
(44, 1, 'hello', NULL, '2025-04-08'),
(45, 1, 'hello', NULL, '2025-04-08'),
(46, 1, 'RAHHHH', NULL, '2025-04-08'),
(47, 1, 'RAHHHH', NULL, '2025-04-08');

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
(37, 9),
(37, 10),
(37, 11),
(38, 12),
(39, 13),
(39, 14),
(40, 15),
(40, 16),
(41, 17),
(41, 18),
(41, 19),
(42, 20),
(44, 39),
(44, 40),
(45, 41),
(45, 42),
(46, 43),
(46, 44),
(47, 45),
(47, 46),
(48, 47),
(48, 48),
(49, 49),
(49, 50);

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
(9, 'uploads/2023-11-12_19-22-19.png', 'png'),
(10, 'uploads/2024-01-26_19-31-10.png', 'png'),
(11, 'uploads/2024-01-29_18-38-51.png', 'png'),
(12, 'uploads/MMV.mp4', 'mp4'),
(13, 'uploads/481035484_8933466520096423_4647936741498567879_n.mp4', 'mp4'),
(14, 'uploads/481975643_4050775005199036_7365244694073895268_n (1).jpg', 'jpg'),
(15, 'uploads/481368844_9289984564423323_8759346423402632473_n.mp4', 'mp4'),
(16, 'uploads/Le mont Boukornine, vu du ciel (III) 2-2 screenshot.png', 'png'),
(17, 'uploads/481035484_8933466520096423_4647936741498567879_n.mp4', 'mp4'),
(18, 'uploads/481368844_9289984564423323_8759346423402632473_n (1).mp4', 'mp4'),
(19, 'uploads/481975643_4050775005199036_7365244694073895268_n (1).jpg', 'jpg'),
(20, 'uploads/video.mp4', 'mp4'),
(21, '../uploads/2023-11-12_17-18-35.png', 'png'),
(22, '../uploads/2023-11-12_17-18-35.png', 'png'),
(23, '../uploads/2023-11-12_17-18-35.png', 'png'),
(24, '../uploads/2023-11-18_14-34-58.png', 'png'),
(25, '../uploads/2023-11-12_17-18-35.png', 'png'),
(26, '../uploads/2023-11-18_14-34-58.png', 'png'),
(27, 'uploads/../2023-11-12_17-18-35.png', 'png'),
(28, 'uploads/../2023-11-18_14-34-58.png', 'png'),
(29, 'uploads/2023-11-13_20-18-11.png', 'png'),
(30, 'uploads/2023-11-13_20-48-37.png', 'png'),
(31, 'uploads/2023-11-13_20-18-11.png', 'png'),
(32, 'uploads/2023-11-13_20-48-37.png', 'png'),
(33, 'uploads/2023-11-13_20-18-11.png', 'png'),
(34, 'uploads/2023-11-13_20-48-37.png', 'png'),
(35, 'uploads/2023-11-13_20-18-11.png', 'png'),
(36, 'uploads/2023-11-13_20-48-37.png', 'png'),
(37, 'uploads/2023-11-13_20-18-11.png', 'png'),
(38, 'uploads/2023-11-13_20-48-37.png', 'png'),
(39, 'uploads/2023-11-13_20-18-11.png', 'png'),
(40, 'uploads/2023-11-13_20-48-37.png', 'png'),
(41, 'uploads/2023-11-13_20-18-11.png', 'png'),
(42, 'uploads/2023-11-13_20-48-37.png', 'png'),
(43, 'uploads/2023-11-13_20-18-11.png', 'png'),
(44, 'uploads/2023-11-13_20-48-37.png', 'png'),
(45, 'uploads/2023-11-13_20-18-11.png', 'png'),
(46, 'uploads/2023-11-13_20-48-37.png', 'png'),
(47, 'uploads/2023-11-13_20-18-11.png', 'png'),
(48, 'uploads/2023-11-13_20-48-37.png', 'png'),
(49, 'uploads/2023-11-13_20-18-11.png', 'png'),
(50, 'uploads/2023-11-13_20-48-37.png', 'png');

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
(2, 'jane_smith', '2021-11-05', 'uploads/image1.png', 'Los Angeles', '0000', ''),
(3, 'mike_jones', '2023-03-22', 'uploads/image1.png', 'Chicago', '0000', ''),
(4, 'sarah_wilson', '2022-07-30', 'uploads/image1.png', 'Miami', '0000', ''),
(5, 'alex_green', '2023-01-10', 'uploads/image1.png', 'Seattle', '0000', ''),
(6, 'emily_brown', '2021-09-18', 'uploads/image1.png', 'Boston', '0000', ''),
(7, 'david_clark', '2022-05-12', 'uploads/image1.png', 'Austin', '0000', ''),
(8, 'lisa_taylor', '2023-02-28', 'uploads/image1.png', 'Denver', '0000', ''),
(9, 'kevin_lee', '2021-12-25', 'uploads/image1.png', 'San Francisco', '0000', ''),
(10, 'amy_adams', '2022-08-07', 'uploads/image1.png', 'Portland', '0000', '');

-- --------------------------------------------------------

--
-- Table structure for table `userresume`
--

CREATE TABLE `userresume` (
  `userId` int(11) NOT NULL,
  `uploadId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userresume`
--

INSERT INTO `userresume` (`userId`, `uploadId`) VALUES
(1, 9);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `upload`
--
ALTER TABLE `upload`
  ADD PRIMARY KEY (`upload_id`);

--
-- Indexes for table `useraccount`
--
ALTER TABLE `useraccount`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `userresume`
--
ALTER TABLE `userresume`
  ADD PRIMARY KEY (`userId`,`uploadId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `upload`
--
ALTER TABLE `upload`
  MODIFY `upload_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `useraccount`
--
ALTER TABLE `useraccount`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
