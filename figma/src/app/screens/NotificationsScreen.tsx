import { useNavigate } from 'react-router';
import { ArrowLeft, Heart, MessageCircle, UserPlus, MapPin } from 'lucide-react';
import { MobileContainer } from '../components/MobileContainer';

const notifications = [
  {
    id: 1,
    type: 'like',
    user: 'Sarah Chen',
    userImage: 'https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBjYXN1YWx8ZW58MXx8fHwxNzc1MjM1NTE3fDA&ixlib=rb-4.1.0&q=80&w=200',
    message: 'liked your post',
    time: '5m ago',
    postImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MjczNDQyfDA&ixlib=rb-4.1.0&q=80&w=200',
  },
  {
    id: 2,
    type: 'comment',
    user: 'Mike Rodriguez',
    userImage: 'https://images.unsplash.com/photo-1611095006856-19f5ffdca7f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwY2FzdWFsfGVufDF8fHx8MTc3NTIzNDk0Mnww&ixlib=rb-4.1.0&q=80&w=200',
    message: 'commented: "This looks amazing! 😍"',
    time: '12m ago',
    postImage: 'https://images.unsplash.com/photo-1524584830732-b69165ddba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc3NTI5MjkyNXww&ixlib=rb-4.1.0&q=80&w=200',
  },
  {
    id: 3,
    type: 'nearby',
    user: 'Emma Wilson',
    userImage: 'https://images.unsplash.com/photo-1545311630-51ea4a4c84de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwaGFwcHklMjBzbWlsaW5nfGVufDF8fHx8MTc3NTI5MjkyNnww&ixlib=rb-4.1.0&q=80&w=200',
    message: 'posted nearby',
    time: '1h ago',
    postImage: 'https://images.unsplash.com/photo-1774268503699-5fad483fa226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzc1MjkyOTI1fDA&ixlib=rb-4.1.0&q=80&w=200',
  },
  {
    id: 4,
    type: 'follow',
    user: 'James Park',
    userImage: 'https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzUyMDk4NTV8MA&ixlib=rb-4.1.0&q=80&w=200',
    message: 'started following you',
    time: '2h ago',
  },
  {
    id: 5,
    type: 'like',
    user: 'The Local Bakery',
    userImage: 'https://images.unsplash.com/photo-1649436401481-f4128d7a3585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cmllcyUyMGRpc3BsYXl8ZW58MXx8fHwxNzc1MjkyOTI3fDA&ixlib=rb-4.1.0&q=80&w=200',
    message: 'liked your post',
    time: '3h ago',
    postImage: 'https://images.unsplash.com/photo-1665482955116-8226c353a5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NzUyNDE4MTJ8MA&ixlib=rb-4.1.0&q=80&w=200',
  },
  {
    id: 6,
    type: 'comment',
    user: 'Sarah Chen',
    userImage: 'https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBjYXN1YWx8ZW58MXx8fHwxNzc1MjM1NTE3fDA&ixlib=rb-4.1.0&q=80&w=200',
    message: 'commented: "We should go together!"',
    time: '5h ago',
    postImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MjczNDQyfDA&ixlib=rb-4.1.0&q=80&w=200',
  },
  {
    id: 7,
    type: 'nearby',
    user: 'Mike Rodriguez',
    userImage: 'https://images.unsplash.com/photo-1611095006856-19f5ffdca7f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwY2FzdWFsfGVufDF8fHx8MTc3NTIzNDk0Mnww&ixlib=rb-4.1.0&q=80&w=200',
    message: 'posted nearby',
    time: '1d ago',
    postImage: 'https://images.unsplash.com/photo-1524584830732-b69165ddba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc3NTI5MjkyNXww&ixlib=rb-4.1.0&q=80&w=200',
  },
];

function getNotificationIcon(type: string) {
  switch (type) {
    case 'like':
      return <Heart className="w-5 h-5 text-red-500" fill="currentColor" />;
    case 'comment':
      return <MessageCircle className="w-5 h-5 text-blue-500" />;
    case 'follow':
      return <UserPlus className="w-5 h-5 text-purple-500" />;
    case 'nearby':
      return <MapPin className="w-5 h-5 text-green-500" />;
    default:
      return <Heart className="w-5 h-5 text-gray-500" />;
  }
}

export function NotificationsScreen() {
  const navigate = useNavigate();
  
  return (
    <MobileContainer>
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <button 
            onClick={() => navigate('/home')}
            className="text-gray-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
        
        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              {/* User Image */}
              <div className="relative">
                <img 
                  src={notification.userImage}
                  alt={notification.user}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user}</span>
                  {' '}
                  <span className="text-gray-600">{notification.message}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
              
              {/* Post Image (if applicable) */}
              {notification.postImage && (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    src={notification.postImage}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Follow button (if follow type) */}
              {notification.type === 'follow' && (
                <button className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors flex-shrink-0">
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </MobileContainer>
  );
}
