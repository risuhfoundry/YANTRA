import { createAnonClient } from './server';

type AccessRequestInput = {
  name?: string;
  email?: string;
  message?: string;
};

type AccessRequestInsert = {
  name: string;
  email: string;
  message: string;
};

function normalizeText(value: string | undefined) {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateAccessRequest(input: AccessRequestInput) {
  const errors: string[] = [];
  const email = normalizeText(input.email);
  const name = normalizeText(input.name);

  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email is required');
  }

  if (!name) {
    errors.push('Name is required');
  }

  if (typeof input.message !== 'undefined' && typeof input.message !== 'string') {
    errors.push('Message must be text');
  }

  return errors;
}

export function normalizeAccessRequest(input: AccessRequestInput): AccessRequestInsert {
  return {
    name: normalizeText(input.name),
    email: normalizeText(input.email).toLowerCase(),
    message: normalizeText(input.message),
  };
}

export async function createAccessRequest(input: AccessRequestInsert) {
  const supabase = createAnonClient();
  const { error } = await supabase.from('access_requests').insert(input);

  if (error) {
    throw error;
  }
}
