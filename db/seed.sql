
USE snippetsDB;

-- Example Tags --
INSERT INTO tags (tagName) VALUES ("React"), ("Vue"), ("Angular"), ("jQuery"), ("Heroku"), ("Bootstrap"), ("mySQL"), ("Handlebars");


-- Preffered method for adds a tag to a snippet --
INSERT INTO linkingTable (linkSnippetID, linkTagID) VALUES (1,1), (1,5), (2,2), (2,6), (3,1), (4,2), (5,8), (6,7), (7,3), (8,6);

INSERT INTO snippets (snippetTitle, snippetBody, description, language) 
VALUES ("AJAX Call", '$.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.Runtime);
    });', "An AJAX call using the GET method", "javascript"),
    ("Filter method", 'const arr2 = [1, 5, 10, 20, 50];
    const filtered2 = arr2.filter(num => {
    return num >= 10;
    })
    // [10, 20, 50]', "The ES6 Filter method.", "javascript"),
    ("All unique", 'def all_unique(lst):
    return len(lst) == len(set(lst))
    x = [1,1,2,2,3,2,3,4,5,6]
    y = [1,2,3,4,5]
    all_unique(x) # False
    all_unique(y) # True', "The following method checks whether the given list has duplicate elements. It uses the property of set() which removes duplicate elements from the list.",
    "python"),
    ("Anagrams", 'from collections import Counter
    def anagram(first, second):
    return Counter(first) == Counter(second)
    anagram("abcd3", "3acdb") # True', "This method can be used to check if two strings are anagrams. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    "python"),
    ("Chunk", '
    def chunk(list, size):
    return [list[i:i+size] for i in range(0,len(list), size)]', "This method chunks a list into smaller lists of a specified size.", "python"),
    ("Display source code of any webpage", '<?php // display source code
    $lines = file("http://google.com/");
    foreach ($lines as $line_num => $line) { 
	  // loop thru each line and prepend line numbers
	  echo "Line #<b>{$line_num}</b> : " . htmlspecialchars($line) . "<br>\n";
    }', "Want to be able to display the source code of any webpage, with line numbering? Here is a simple code snippet to do it. Just modify the url on line 2 at your convenience.", "php"),
    ("Check if server is HTTPS", 'if ($_SERVER["HTTPS"] != "on") { 
	  echo "This is not HTTPS";
    }else{
	  echo "This is HTTPS";
    }', "Is my script running on a HTTPS server? Good question. This handy snippet can give you the answer. Nothing complicated at all!", "php"),
    ("Get Host by IP adress", 'string IPAdress = "127.0.0.1";
    IPHostEntry IPHostEntryObject = Dns.GetHostEntry(IPAdress);
    Console.WriteLine(IPHostEntryObject.HostName);', "Shows how to retrieve the hostname from a given IP adress.", "csharp"),
    ("Is folder", 'public bool IsFolder(string path)
    {
    return ((File.GetAttributes(path) & FileAttributes.Directory) == FileAttributes.Directory);
    }', "This is a little helper function to check whether a given path is a folder or a file.", "csharp"),
    ("Vertical Centering", 'display: flex;
    justify-content: center; /* Horizontal Centering */
    align-items: center;     /* Vertical Centering */', "Centering content vertically using flexbox.", "css3"),
    ("CSS3 Zebra Stripes", 'tbody tr:nth-child(odd) {
    background-color: #ccc;
    }', "By adding zebra stripes on default we can update odd rows with varying background colors.", "css3"),
    ("Sum of Two Numbers", '#include<stdio.h>
    void main()
    {
    int a,b,c;
    printf("enter two numbers");
    scanf("%d%d",&a&b);
    c=a+b;
    printf("sum is %d",c);
    getch();
    }', "Provides the sum of two inputted numbers", "c"),
    ("Interrupts", 'int pin = 13;
volatile int state = LOW;
void setup()
{
  pinMode(pin, OUTPUT);
  attachInterrupt(0, blink, CHANGE);
}
void loop()
{
  digitalWrite(pin, state);
}
void blink()
{
  state = !state;
}', "A code snippet for interrupts in C.", "c"),
("Append text to a File", 'BufferedWriter out = null;
try {
    out = new BufferedWriter(new FileWriter(”filename”, true));
    out.write(”aString”);
} catch (IOException e) {
    // error processing code
} finally {
    if (out != null) {
        out.close();
    }
}', "A java code snippet that appends text to a file.", "java"),
("Send HTTP request and fetch data", 'import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
public class Main {
    public static void main(String[] args)  {
        try {
            URL my_url = new URL("http://www.viralpatel.net/blogs/");
            BufferedReader br = new BufferedReader(new InputStreamReader(my_url.openStream()));
            String strTemp = "";
            while(null != (strTemp = br.readLine())){
                System.out.println(strTemp);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}', "A java code snippet for sending an HTTP request and fetching the resulting data.", "java")