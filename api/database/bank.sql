-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `userId` VARCHAR(45) NOT NULL,
  `userName` VARCHAR(50) NULL,
  `userPassword` VARCHAR(45) NULL,
  `userGender` VARCHAR(15) NULL,
  `userEmail` VARCHAR(255) NULL,
  `userStreet` VARCHAR(255) NULL,
  `userCity` VARCHAR(255) NULL,
  `userState` VARCHAR(255) NULL,
  `userDOB` VARCHAR(45) NULL,
  `userPhoneNo` VARCHAR(45) NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`account` ;

CREATE TABLE IF NOT EXISTS `mydb`.`account` (
  `accountNumber` VARCHAR(45) NOT NULL,
  `userId` VARCHAR(45) NOT NULL,
  `accountBalance` INT NULL,
  `accountType` VARCHAR(45) NOT NULL,
  `cardNumber` VARCHAR(45) NULL,
  `accountBranchLocation` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`accountNumber`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`payment_management`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`payment_management` ;

CREATE TABLE IF NOT EXISTS `mydb`.`payment_management` (
  `paymentId` VARCHAR(45) NOT NULL,
  `userId` VARCHAR(45) NULL,
  `paymentTitle` VARCHAR(255) NULL,
  `paymentAmount` INT UNSIGNED NOT NULL,
  `paymentDate` DATETIME NOT NULL,
  `paymentType` VARCHAR(45) NOT NULL,
  `recieverAccountId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`paymentId`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
