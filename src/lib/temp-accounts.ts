import fs from 'fs';
import path from 'path';
import { hashPassword, verifyPassword } from './auth-utils';
import crypto from 'crypto';

// Define interface for temp account
export interface TempAccount {
  _id: string;
  email: string;
  name: string;
  nip: string;
  password: string;
  registeredAt: string;
}

// Path to JSON file
const tempAccountsPath = path.join(process.cwd(), 'temp-accounts.json');

// Function to read temp accounts
export function readTempAccounts(): TempAccount[] {
  try {
    console.log('Reading temp accounts from file:', tempAccountsPath);
    
    if (!fs.existsSync(tempAccountsPath)) {
      console.log('Temp accounts file does not exist, creating empty file');
      fs.writeFileSync(tempAccountsPath, JSON.stringify({ accounts: [] }));
      return [];
    }
    
    const data = fs.readFileSync(tempAccountsPath, 'utf8');
    console.log('Temp accounts file read successfully, size:', data.length);
    
    const parsed = JSON.parse(data);
    const accounts = parsed.accounts || [];
    console.log('Parsed temp accounts count:', accounts.length);
    
    return accounts;
  } catch (error) {
    console.error('Error reading temp accounts:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return [];
  }
}

// Function to write temp accounts
function writeTempAccounts(accounts: TempAccount[]): void {
  try {
    console.log('Writing temp accounts to file, count:', accounts.length);
    fs.writeFileSync(tempAccountsPath, JSON.stringify({ accounts }, null, 2));
    console.log('Temp accounts file written successfully');
  } catch (error) {
    console.error('Error writing temp accounts:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
  }
}

// Function to add a new temp account
export async function addTempAccount(email: string, password: string, name: string, nip: string): Promise<TempAccount> {
  console.log('Adding new temp account for:', email);
  const accounts = readTempAccounts();
  
  // Check if account already exists
  const existingAccount = accounts.find(acc => acc.email === email);
  if (existingAccount) {
    console.log('Account with this email already exists');
    throw new Error('Account with this email already exists');
  }
  
  // Create new account
  console.log('Hashing password for new temp account');
  const hashedPassword = await hashPassword(password);
  
  const accountId = crypto.randomUUID();
  console.log('Generated new account ID:', accountId);
  
  const newAccount: TempAccount = {
    _id: accountId,
    email,
    name,
    nip,
    password: hashedPassword,
    registeredAt: new Date().toISOString()
  };
  
  // Add to accounts and save
  console.log('Adding account to memory array');
  accounts.push(newAccount);
  
  console.log('Writing updated accounts to file');
  writeTempAccounts(accounts);
  
  console.log(`Temporary account created: ${email} with ID: ${accountId}`);
  return newAccount;
}

// Function to get a temp account by email
export function getTempAccountByEmail(email: string): TempAccount | undefined {
  const accounts = readTempAccounts();
  return accounts.find(acc => acc.email === email);
}

// Function to verify temp account credentials
export async function verifyTempAccount(email: string, password: string): Promise<TempAccount | null> {
  console.log('Verifying temp account for:', email);
  const account = getTempAccountByEmail(email);
  console.log('Temp account found in file:', !!account);
  
  if (!account) return null;
  
  try {
    console.log('Verifying password for temp account');
    const isValid = await verifyPassword(password, account.password);
    console.log('Password verification result:', isValid);
    return isValid ? account : null;
  } catch (error) {
    console.error('Error verifying temp account password:', error);
    return null;
  }
}

// Function to remove a temp account
export function removeTempAccount(email: string): boolean {
  const accounts = readTempAccounts();
  const filteredAccounts = accounts.filter(acc => acc.email !== email);
  
  if (filteredAccounts.length === accounts.length) {
    return false; // No account was removed
  }
  
  writeTempAccounts(filteredAccounts);
  return true;
}

// Function to check if account exists by email
export function tempAccountExists(email: string): boolean {
  return !!getTempAccountByEmail(email);
}