erDiagram
User ||--o{ Account : has
User ||--o{ Booking : makes
User {
string id
string name
string username
string password
string email
datetime emailVerified
string image
enum role
}
Account {
string id
string userId
string type
string provider
string providerAccountId
}
Booking ||--|{ BookingLog : has
Booking ||--|| Room : reserves
Booking {
string id
string userId
datetime startDate
datetime endDate
int dateCount
string purpose
string roomId
}
BookingLog {
string id
string bookingId
enum status
string description
}
Building ||--|{ Floor : contains
Building {
string id
string name
}
Floor ||--|{ Room : has
Floor {
string id
string name
string buildingId
}
Room {
string id
string name
int capacity
string facilities
string imagePath
string floorId
}
SiteSetting {
string id
string name
string logo
}
