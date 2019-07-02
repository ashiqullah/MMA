
export const Service: any = {

    /**
     * Url of your Laravel Project
     */
/*      url: 'http://localhost:85/',
    apiUrl: 'http://localhost:85/api',
     maleImageUrl: 'http://localhost:85/profile_pic/profile_simple.png',
femaleImageUrl: 'http://localhost:85/profile_pic/profile_simple_gril.png', 
newsImageUrl: 'http://localhost:85/upload/news.png',
eventImageUrl: 'http://localhost:85/upload/events.jpg',  */

  url: 'http://192.168.43.210:85/',
apiUrl: 'http://192.168.43.210:85/api',
 maleImageUrl: 'http://192.168.43.210:85/profile_pic/profile_simple.png',
femaleImageUrl: 'http://192.168.43.210:85/profile_pic/profile_simple_gril.png', 
newsImageUrl: 'http://192.168.43.210:85/upload/news.png',
eventImageUrl: 'http://192.168.43.210:85/upload/events.jpg', 
 
    /*
url: 'http://192.168.43.210:85/',
apiUrl: 'http://192.168.43.210:85/api',
maleImageUrl: 'http://192.168.43.210:85/profile_pic/profile_simple.png',
femaleImageUrl: 'http://192.168.43.210:85/profile_pic/profile_simple_gril.png',*/
    /**
     * Info of your passport client, usually second record on table "oauth_clients" in your database, name "Laravel Password Grant Client"
     */
    passport: {
        grant_type: 'password',
        client_id: 1,
        client_secret: 'EFypeYfMtH2rVly5UNffPr41hWdNBTQskwmZn4Ks',
    }

  /*     passport: {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'LQRYWgO5I0YByPhW9mRTCZltW8hZrb86JMlL3OkU',
    }  */

};
