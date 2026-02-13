<script>
	export let error;
	export let status;
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-center p-5">
	<h1 class="text-6xl font-bold mb-5 text-red-500">{status}</h1>
	<h2 class="text-2xl font-bold mb-5">{status === 404 ? '页面不存在' : '出错了'}</h2>
	<p class="text-gray-600 mb-10">{status === 404 ? '抱歉，您访问的页面不存在或已被移除' : error?.message || '未知错误'}</p>
	<a href="/" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
		返回首页
	</a>
</div>