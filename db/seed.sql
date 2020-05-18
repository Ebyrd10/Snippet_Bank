
-- Example Tags --
INSERT INTO tags (tagName) VALUES ("Apple");
INSERT INTO tags (tagName) VALUES ("Oragne");
INSERT INTO tags (tagName) VALUES ("Pie");

-- Preffered method for adds a tag to a snippet --
INSERT INTO linkingTable (linkSnippetID, linkTagID) VALUES (2, 1);
INSERT INTO linkingTable (linkSnippetID, linkTagID) VALUES (3, 1);
INSERT INTO linkingTable (linkSnippetID, linkTagID) VALUES (3, 3);