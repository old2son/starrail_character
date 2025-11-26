import { writable } from 'svelte/store';

export const toast = writable({ show: false, message: '', type: 'info' });

// 样式2秒
export function showToast(message = '暂无信息', type = 'info', duration = 2500) {
	toast.set({ show: true, message, type });
	setTimeout(() => toast.set({ show: false, message: '', type }), duration);
}
