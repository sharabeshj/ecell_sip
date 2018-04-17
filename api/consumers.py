from channels.generic.websocket import AsyncWebsocketConsumer
import json

class JobConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.channel_layer.group_add("jobs",self.channel_name)
		await self.accept()

	async def disconnect(self):
		await self.channel_layer.group_discard("jobs",self.channel_name)

	async def receive(self,text_data):
		text_data_json = json.loads(text_data)
		title = text_data_json['title']
		description = text_data_json['description']
		category = text_data_json['category']
		await self.channel_layer.group_send("jobs",{
			'type' : 'job_message',
			'data' : json.dumps({
				'title' : title,
				'description' : description,
				'category' : category
				})
			})

	async def job_message(self,event):
		data = event['data']
		await self.send(text_data = data)

class ApplicantConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.channel_layer.group_add("applicants",self.channel_name)
		await self.accept()

	async def disconnect(self):
		await self.channel_layer.group_discard("applicants",self.channel_name)

	async def receive(self,text_data):
		text_data_json = json.loads(text_data)
		acttivity_type = text_data_json['acttivity_type']
		await self.channel_layer.group_send("applicants",{
			'type' : 'applicant_message',
			'data' : json.dumps({
				'acttivity_type' : acttivity_type
				})
			})

	async def applicant_message(self,event):
		data = event['data']
		await self.send(text_data = data)