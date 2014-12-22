=========== CoinCoin* =============
CoinCoin* คือ เว็บ application สำหรับขายของหน้าร้าน (Point of Sell) เพื่อใช้ในชมรมการศึกษาเท่านั้น

วิธีการติดตั้ง (How to install)

1. ให้ทำการตั้งค่าฐานข้อมูลที่โฟลเดอร์ "inc/setting.inc.php"

$config['host'] = "localhost"; 		//ชื่อ server
$config['user'] = "root";		//ชื่อผู้ใช้ฐานข้อมูล
$config['pass'] = "password";		//รหัสผ่านของฐานข้อมูล
$config['dbname'] = "coincoin";		//ชื่อฐานข้อมูล

2. import  ฐานข้อมูล
โดยการเปิด http://localhost/phpmyadmin แล้วทำการสร้างฐานข้อมูลเตรียมไว้
เลือกเมนู import แล้วทำการเลือกไฟล์ "coincoin.sql" ที่อยู่ในนี้ จากนั้นก็ go เพื่อประมวลคำสั่ง

3. เข้าใช้งานระบบเว็บ ระบบได้ทำการสร้างรหัสผู้ใช้งานเริ่มต้นมาให้เป็น
username : admin
password : admin

4. สามารถแก้ไขตำแหน่ง footer ได้จากไฟล์ "inc/footer.inc.php"


=========================================