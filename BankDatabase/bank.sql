-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bank
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bank` ;

-- -----------------------------------------------------
-- Schema bank
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bank` DEFAULT CHARACTER SET utf8 ;
USE `bank` ;

-- -----------------------------------------------------
-- Table `bank`.`account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bank`.`account` ;

CREATE TABLE IF NOT EXISTS `bank`.`account` (
  `accountNumber` VARCHAR(45) NOT NULL,
  `accountBalance` INT(11) NULL DEFAULT NULL,
  `accountType` VARCHAR(45) NOT NULL,
  `cardNumber` VARCHAR(45) NULL DEFAULT NULL,
  `accountBranchLocation` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`accountNumber`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bank`.`payment_send`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bank`.`payment_send` ;

CREATE TABLE IF NOT EXISTS `bank`.`payment_send` (
  `paymentId` VARCHAR(45) NOT NULL,
  `paymentTitle` VARCHAR(255) NULL DEFAULT NULL,
  `paymentAmount` INT(10) UNSIGNED NOT NULL,
  `paymentDate` DATETIME NOT NULL,
  `paymentType` VARCHAR(45) NOT NULL,
  `recieverAccountId` VARCHAR(45) NOT NULL,
  `account_accountNumber` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`paymentId`, `account_accountNumber`),
  INDEX `fk_payment_management_account1_idx` (`account_accountNumber` ASC) VISIBLE,
  CONSTRAINT `fk_payment_management_account1`
    FOREIGN KEY (`account_accountNumber`)
    REFERENCES `bank`.`account` (`accountNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bank`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bank`.`user` ;

CREATE TABLE IF NOT EXISTS `bank`.`user` (
  `userId` VARCHAR(45) NOT NULL,
  `userName` VARCHAR(50) NULL DEFAULT NULL,
  `userPassword` VARCHAR(45) NULL DEFAULT NULL,
  `userGender` VARCHAR(15) NULL DEFAULT NULL,
  `userEmail` VARCHAR(255) NULL DEFAULT NULL,
  `userStreet` VARCHAR(255) NULL DEFAULT NULL,
  `userCity` VARCHAR(255) NULL DEFAULT NULL,
  `userState` VARCHAR(255) NULL DEFAULT NULL,
  `userDOB` VARCHAR(45) NULL DEFAULT NULL,
  `userPhoneNo` VARCHAR(45) NULL DEFAULT NULL,
  `account_accountNumber` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userId`, `account_accountNumber`),
  INDEX `fk_user_account_idx` (`account_accountNumber` ASC) VISIBLE,
  CONSTRAINT `fk_user_account`
    FOREIGN KEY (`account_accountNumber`)
    REFERENCES `bank`.`account` (`accountNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bank`.`payment_recieve`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bank`.`payment_recieve` ;

CREATE TABLE IF NOT EXISTS `bank`.`payment_recieve` (
  `paymentId` VARCHAR(45) NOT NULL,
  `paymentTitle` VARCHAR(255) NULL DEFAULT NULL,
  `paymentAmount` INT(10) UNSIGNED NOT NULL,
  `paymentDate` DATETIME NOT NULL,
  `senderAccountId` VARCHAR(45) NOT NULL,
  `account_accountNumber` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`paymentId`, `account_accountNumber`),
  INDEX `fk_payment_recieve_account1_idx` (`account_accountNumber` ASC) VISIBLE,
  CONSTRAINT `fk_payment_recieve_account1`
    FOREIGN KEY (`account_accountNumber`)
    REFERENCES `bank`.`account` (`accountNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
