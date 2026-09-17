import { ReviewItem, EnquiryItem, AdminStats, AdminUser, ReviewStatus, EnquiryStatus } from '../types';

const TOKEN_KEY = 'admin_jwt_token';

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If body is not FormData, default to application/json
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    removeAuthToken();
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin') {
      window.location.href = '/admin';
    }
    throw new Error(data.error || 'Session expired. Please login again.');
  }

  if (!response.ok) {
    throw new Error(data.error || 'Request failed. Please try again.');
  }

  return data;
}

// ---------------- Authentication APIs ----------------

export async function loginAdmin(email: string, password: string): Promise<{ token: string; admin: AdminUser }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Invalid email or password.');
  }

  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
}

export async function fetchCurrentAdmin(): Promise<AdminUser> {
  const data = await fetchWithAuth('/api/auth/me');
  return data.admin;
}

export async function updateAdminProfile(name: string, email: string): Promise<{ admin: AdminUser; message: string }> {
  return await fetchWithAuth('/api/auth/profile', {
    method: 'POST',
    body: JSON.stringify({ name, email }),
  });
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ message: string }> {
  return await fetchWithAuth('/api/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });
}

export async function logoutAdmin(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (e) {
    // Ignore network failures on logout
  } finally {
    removeAuthToken();
  }
}

// ---------------- Admin Review Management ----------------

export async function fetchAdminStats(): Promise<AdminStats> {
  const data = await fetchWithAuth('/api/admin/stats');
  return data.stats;
}

export async function fetchAdminReviews(status?: ReviewStatus): Promise<ReviewItem[]> {
  const url = status ? `/api/admin/reviews?status=${status}` : '/api/admin/reviews';
  const data = await fetchWithAuth(url);
  return data.reviews || [];
}

export async function approveReview(id: string): Promise<ReviewItem> {
  const data = await fetchWithAuth(`/api/admin/reviews/${id}/approve`, {
    method: 'PATCH',
  });
  return data.review;
}

export async function rejectReview(id: string): Promise<ReviewItem> {
  const data = await fetchWithAuth(`/api/admin/reviews/${id}/reject`, {
    method: 'PATCH',
  });
  return data.review;
}

export async function deleteReview(id: string): Promise<void> {
  await fetchWithAuth(`/api/admin/reviews/${id}`, {
    method: 'DELETE',
  });
}

// ---------------- Admin Enquiry Management ----------------

export async function fetchAdminEnquiries(status?: EnquiryStatus): Promise<EnquiryItem[]> {
  const url = status ? `/api/admin/enquiries?status=${status}` : '/api/admin/enquiries';
  const data = await fetchWithAuth(url);
  return data.enquiries || [];
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<EnquiryItem> {
  const data = await fetchWithAuth(`/api/admin/enquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return data.enquiry;
}

export async function deleteEnquiry(id: string): Promise<void> {
  await fetchWithAuth(`/api/admin/enquiries/${id}`, {
    method: 'DELETE',
  });
}

// ---------------- Public Reviews & Contact ----------------

export async function fetchPublicApprovedReviews(): Promise<ReviewItem[]> {
  const res = await fetch('/api/reviews/approved');
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load reviews');
  }
  return data.reviews || [];
}

export async function submitPublicReview(formData: FormData): Promise<{ message: string; reviewId: string }> {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    body: formData, // browser automatically sets multipart/form-data boundary
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Unable to submit review. Please try again.');
  }
  return data;
}

export async function submitPublicEnquiry(formData: any): Promise<{ message: string; enquiryId: string }> {
  const res = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Unable to submit enquiry. Please try again.');
  }
  return data;
}
