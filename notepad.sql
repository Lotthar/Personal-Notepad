-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2019 at 10:37 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notepad`
--

-- --------------------------------------------------------

--
-- Table structure for table `biljeske`
--

CREATE TABLE `biljeske` (
  `naziv` varchar(50) NOT NULL,
  `datum` varchar(50) DEFAULT NULL,
  `bold` varchar(1) DEFAULT NULL,
  `italic` varchar(1) DEFAULT NULL,
  `under` varchar(1) DEFAULT NULL,
  `font` varchar(10) DEFAULT NULL,
  `boja` varchar(50) DEFAULT NULL,
  `tekst` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `biljeske`
--

INSERT INTO `biljeske` (`naziv`, `datum`, `bold`, `italic`, `under`, `font`, `boja`, `tekst`) VALUES
('IT projekat - uputstvo', '2019-05-09', '1', '0', '0', '25', '800000', 'Uputstva:');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `biljeske`
--
ALTER TABLE `biljeske`
  ADD PRIMARY KEY (`naziv`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
