<template>
	<div class="admin-table margin-top-20">
		<h4>归属线路</h4>
		<table class="table">
			<thead>
			<tr>
				<th class=" text-align-c">创建时间</th>
				<th>线路标识</th>
				<th>运营商</th>
				<th>归属地</th>
				<th>支持透传</th>
				<th>质量</th>
				<th>并发容量</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
				<td>23424324</td>
				<td>电信</td>
				<td>020</td>
				<td>是</td>
				<td>2</td>
				<td>10000</td>
			</tr>
			</tbody>
		</table>
		<h4 class="margin-top-20">透传线路</h4>
		<table class="table">
			<thead>
			<tr>
				<th class=" text-align-c">创建时间</th>
				<th>线路标识</th>
				<th>运营商</th>
				<th>归属地</th>
				<th>支持透传</th>
				<th>质量</th>
				<th>并发容量</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
				<td>23424324</td>
				<td>电信</td>
				<td>020</td>
				<td>是</td>
				<td>2</td>
				<td>10000</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>