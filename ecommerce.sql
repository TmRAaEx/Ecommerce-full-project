-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 28 mars 2025 kl 14:46
-- Serverversion: 10.4.32-MariaDB
-- PHP-version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `ecommerce`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(1, 'tmraaex', '$2b$10$U6Q738mWWeDPkg3RjKyew.bLqZEiQdAPWv1Np9TVVxoFcWaLD6WMO'),
(6, 'tmraaex2', '$2b$10$w9s.lwMzmpp9rAnWtAgUAuFTqi44G9xetUnGVnhlO0SdrW0plpTuK'),
(8, 'tmraaex3', '$2b$10$QJ1EwksacnNSCQ3WZsJx2.2K.WIgRPXAF6hbiP8Q38jWzpknunqjW'),
(9, 'test', '$2b$10$5eSnaRu9ysvj1ib7TrJIdeWe/0PbcVRKERd.Jm6eQad9Ljy54OVIy');

-- --------------------------------------------------------

--
-- Tabellstruktur `customers`
--

CREATE TABLE `customers` (
  `id` int(10) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `postal_code` varchar(30) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumpning av Data i tabell `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `street_address`, `postal_code`, `city`, `country`, `created_at`) VALUES
(22, 'Alexander', 'Hirsch', 'tmr.aaex@gmail.com', '$2b$10$RANMljNOGQatQQMBblWlR.XKzbZsLYDHSB8GGp0UQhD8r4Lp1udFK', '0708137433', 'Långgatan 19', '665 30', 'Kil', 'Sverige', '2025-03-28 13:40:44');

-- --------------------------------------------------------

--
-- Tabellstruktur `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `customer_id` int(10) NOT NULL,
  `total_price` int(5) NOT NULL,
  `payment_status` varchar(30) NOT NULL,
  `payment_id` varchar(200) DEFAULT NULL,
  `order_status` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumpning av Data i tabell `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `total_price`, `payment_status`, `payment_id`, `order_status`, `created_at`) VALUES
(46, 22, 7200, 'paid', 'cs_test_a1SSM0dfG8udZRTAQWVlstnJ13Gh3SO23kBNedlVSJJbOqgbyZzIqsVYKS', 'received', '2025-03-28 13:44:24');

-- --------------------------------------------------------

--
-- Tabellstruktur `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `quantity` int(5) NOT NULL,
  `unit_price` int(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `created_at`, `image_url`) VALUES
(75, 46, 6, 'Apple iphone 16', 1, 7200, '2025-03-28 13:44:24', 'https://cdn.webhallen.com/images/product/364518?trim');

-- --------------------------------------------------------

--
-- Tabellstruktur `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(5) NOT NULL,
  `regular_price` int(5) NOT NULL,
  `stock` int(4) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumpning av Data i tabell `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `regular_price`, `stock`, `category`, `image`, `created_at`) VALUES
(6, 'Apple iphone 16', 'Telefon', 7200, 9000, 1, 'phones', 'https://cdn.webhallen.com/images/product/364518?trim', '2025-03-11 13:33:09'),
(18, 'Malm - set', 'Säng', 6799, 8499, 112, 'furniture', 'https://www.ikea.com/se/en/images/products/malm-bedroom-furniture-set-of-4-white__1101637_pe866490_s5.jpg', '2025-03-11 14:00:15'),
(19, 'Webhallen config pro r7', 'Dator', 20990, 20990, 0, 'gaming', 'https://cdn.webhallen.com/images/product/373896?trim', '2025-03-11 14:17:37'),
(23, 'Out off stock representation', 'Product to display out off stock', 999, 999, 0, 'food', 'https://picsum.photos/300', '2025-03-12 22:21:05'),
(24, 'MSI Optix MAG345CQR Curved', 'Prisvärd, lagom storlek för ett normalt skrivbord. Produkten har ett grundläggande antal utgångar. Bra bild och lätt att ställa in.', 2993, 3990, 121, 'gaming', 'https://cdn.webhallen.com/images/product/375861?trim', '2025-03-13 09:53:22'),
(25, 'AMD Ryzen 7 7800x3D', 'Upplev AMD\'s kraftfullaste processor för gaming!', 6790, 6790, 993, 'gaming', 'https://cdn.webhallen.com/images/product/376208?trim', '2025-03-14 07:33:35'),
(26, 'Tortilla Medium 8-Pack', 'Santa marias klassiska Tortilla', 18, 18, 123, 'food', 'https://res.cloudinary.com/coopsverige/images/f_auto,fl_clip,fl_progressive,q_auto,c_lpad,g_center,h_120,w_120/v1695042236/cloud/290760/Tortilla%20Medium%208-pack.jpg', '2025-03-14 07:35:32'),
(27, 'Standard mjölk längre hållbarhet', 'Standard 3% mjölk, nu med längre hållbarhet!', 24, 24, 50, 'food', 'https://res.cloudinary.com/coopsverige/images/f_auto,fl_clip,fl_progressive,q_auto,c_lpad,g_center,h_120,w_120/v1718636417/cloud/365514/Standardmj%C3%B6lk%20L%C3%A4ngre%20H%C3%A5llbarhet.jpg', '2025-03-14 07:36:32'),
(28, 'Trådlösa baklyktor', 'Trådlösa baklyktor med magnetiskt fäste', 899, 899, 12, 'cars', 'https://productimages.biltema.com/v1/image/product/medium/2000046997/1', '2025-03-14 07:38:11'),
(29, 'Kvast', 'Kvast med långt skaft', 169, 169, 26, 'gardening', 'https://v.imgi.no/c6fx4lxznc__w=650_h=0?', '2025-03-14 07:40:18'),
(32, 'Lego Batman Tumbler vs Two Face', 'Autentiska äventyr med Batman™\nTumbler har en eldflamma på avgasröret och en instrumentpanel och cockpit för minifiguren på insidan.', 799, 799, 45, 'toys', 'https://www.lego.com/cdn/cs/set/assets/blt6f3ee52e95ff88f6/76303_Prod_en-gb.png?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1', '2025-03-17 13:25:21'),
(33, 'Samsung galaxy s25 Ultra 512Gb | 12Gb Titanium Black', 'Vi presenterar vår mest avancerade processor, anpassad för Galaxy. Med förbättrad realtids-ray tracing och Vulkan-optimering kan du uppleva actionfyllda spel med extremt smidigt gameplay, tack vare Snapdragon® 8 Elite Mobile Platform för Galaxy.10,11,12', 17990, 17990, 1, 'phones', 'https://images.samsung.com/se/smartphones/galaxy-s25-ultra/buy/04_Color-Selection/04_2_Exclusive-Color/Color-Selection_Titanium-Jetblack_PC.png?imbypass=true', '2025-03-17 13:29:07');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index för tabell `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Index för tabell `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Index för tabell `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderItems_orders` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index för tabell `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT för tabell `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT för tabell `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT för tabell `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT för tabell `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Restriktioner för tabell `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_orderItems_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
