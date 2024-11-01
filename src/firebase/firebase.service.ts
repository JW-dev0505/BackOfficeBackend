// src/firebase/firebase.service.ts
import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: any) {}

  async sendPushNotification(token: string, message: { title: string; body: string; data?: any }) {
    const messaging = admin.messaging();
    try {
      const response = await messaging.send({
        token,
        notification: {
          title: message.title,
          body: message.body,
        },
      });

      return response;
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw error;
    }
  }
}
