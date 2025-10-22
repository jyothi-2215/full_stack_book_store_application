import java.sql.*;
import java.util.Scanner;
import com.mysql.cj.jdbc.*;
public class JDBCExample

/**
 * You need to download and put the MySQL JDBC connector 
 * in your project classpath
 */
   {
      public static void main (String args [])
      {
         Statement st = null;
         PreparedStatement pst = null;
         Connection con = null;
         MysqlDataSource source = null;
         String name = "";  // your mysql username
         String pass ="";  // your mysql password
         String dbName = ""; // your mysql database
         String url = "jdbc:mysql://localhost:3306/"+ dbName;
        
         
        try{
             source = new MysqlDataSource();
             source.setURL(url);
             source.setPassword(pass);
             source.setUser(name);
             con =source.getConnection();
             st = con.createStatement();
             
             String studentTbl = "create table student  (Fname VARCHAR (255) not null, Lname VARCHAR (255) not null , ID int(10)  primary key not null, Grade DOUBLE not null )"; 
             st.executeUpdate(studentTbl);
             String studentRec= "INSERT  INTO student ( Fname, Lname, ID, Grade)  VALUES ('John' , 'Smith', 1,   2.75 ),('Lia', 'Kebede', 2, 3.98),( 'Mao', 'Zong' , 3, 2.88),('Ali','Musa', 4, 3.33),('Jane', 'Micheal', 5, 4.0)";
             String studentRec2= "INSERT  INTO student ( Fname, Lname, ID, Grade)  VALUES (?,?,?,?)";
             pst = con.prepareStatement(studentRec2);
             Scanner in = new Scanner(System.in);
             System.out.println("enter the Fname, lName, Id and grade");
             String fname = in.nextLine();
             String lname = in.nextLine();
             int iD = in.nextInt();
             float grade = in.nextFloat();
             pst.setString(1, fname);
             pst.setString(2, lname);
             pst.setInt(3, iD);
             pst.setFloat(4, grade);
             st.executeUpdate(studentRec);
             ResultSet results = st.executeQuery("SELECT * FROM student");
             while (results.next()) {
                 String last = results.getString(1);
                 String first = results.getString(2);
                 int id = results.getInt(3);
                 float cgpa = results.getFloat(4);
                 System.out.println(" " + id + ": " + first + "  " + last + " " + cgpa); 
               }
             con.close();
             st.close();
             in.close();
               }
        catch (SQLException e){
                System.out.println(e);
            }
       }
  }