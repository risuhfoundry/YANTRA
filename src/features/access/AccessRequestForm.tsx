'use client';

import { useState } from 'react';

type AccessRequestFormState = 'idle' | 'loading' | 'success' | 'error';

interface AccessRequestFormProps {
  onSuccess?: () => void;
  className?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const sharedClassName =
    'input-field hoverable peer w-full border-b border-white/12 bg-transparent py-3 text-white transition-colors focus:border-white focus:outline-none';
  const labelClassName =
    'input-label pointer-events-none absolute left-0 top-3 font-mono text-sm text-white/42 transition-all duration-300';

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          placeholder=" "
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${sharedClassName} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder=" "
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={sharedClassName}
        />
      )}
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    </div>
  );
}

export function AccessRequestForm({ onSuccess, className }: AccessRequestFormProps) {
  const [state, setState] = useState<AccessRequestFormState>('idle');
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateField = (name: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');
    setError('');

    try {
      const response = await fetch('/api/access-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || 'Failed to submit request');
      }

      setState('success');
      setFormData({ name: '', email: '', message: '' });
      onSuccess?.();

      // Reset success state after 5 seconds
      setTimeout(() => setState('idle'), 5000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      setState('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className ?? 'flex flex-col gap-8'}>
      <Field id="name" label="Full Name" value={formData.name} onChange={(value) => updateField('name', value)} />
      <Field
        id="email"
        type="email"
        label="Work or Personal Email"
        value={formData.email}
        onChange={(value) => updateField('email', value)}
      />
      <Field
        id="message"
        label="Tell us if you are a learner, institution, or hiring partner"
        value={formData.message}
        onChange={(value) => updateField('message', value)}
        multiline
      />

      {error && (
        <div className="rounded-[1.5rem] border border-red-400/20 bg-red-500/10 px-4 py-4 text-sm text-red-100">
          {error}
        </div>
      )}

      {state === 'success' && (
        <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.05] px-4 py-4 text-sm text-white/82">
          ✓ Your access request has been received. We will reach out to you soon!
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="hoverable mt-2 flex items-center gap-2 self-start rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:bg-white/40"
      >
        {state === 'loading' ? 'Submitting...' : 'Request Access'}
      </button>
    </form>
  );
}
