import { Store, NOTIFICATION_TYPE, NOTIFICATION_CONTAINER, NOTIFICATION_INSERTION } from "react-notifications-component";

const notification: {
  insert: NOTIFICATION_INSERTION;
  container: NOTIFICATION_CONTAINER;
  animationOut: string[];
  animationIn: string[];
  dismiss: { duration: number; pauseOnHover: boolean };
} = {
  insert: "top",
  container: 'top-right',
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 3000,
    pauseOnHover: true
  }
};

function addNotification(notifyData: { title: string; message: string; type: NOTIFICATION_TYPE }) {
  Store.addNotification({
    ...notification,
    title: notifyData.title,
    message: notifyData.message,
    type: notifyData.type
  });
}

export default addNotification;
