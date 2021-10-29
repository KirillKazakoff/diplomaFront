What'sUp Bot
Final Course Work
'appveyour link'

What'sUp Bot is the application which purpose is to store, send and record some user data. 

Features
    Key Features      
        Store all data on the server
        Lazy load from server on user scroll 
        Rendering the sent files preview
        Send files with Drag and Drop or header button
        Send user text with footer input
        Links recognition in user text
        The possibility of downloading files by user
    Aux Features
        Reading media (audio and video files)
        Recording media with videoJs plugin
        Zip files when upload and unzip files on download from server  
        ServiceWorker and WebWorker tech implementation
        Unavailable now: changing background and user avatar || searching by messages content

Storing all data on the server
    Server is build with Koa framework on node-js. 

    A data that was sent by user is posting on the server with several requests. The first one sends file's data (name, id, etc), the second one sends file itself. 

    On 'data post' file is transforming to FormData object and then server gets it with Koa-multer middleware.

    On 'data get' file is taken from the 'public' directory on the server.

Lazy load from server on user scroll 
    On the first load, users get few files (now there are 5 files) - it happens by combination of several requests: the first one gets the data about these files.

    When response on the first request is received, other 'getFile' requests will happen one by one (synchronously) in line with the first request data. Finally, all messages will be rendered. 

    When user scroll to the end of the chat-container, the aforementioned instruction will be repeated.

    When the last file is sent, server will send the response with 'false'.


Key Features
    Rendering the sent files preview
        How does it work
            When you send some data (by text input either drag and Drop or header button) then it will be rendered. Messages are distinguished by several types
        Realization
            look at the architecture section(link)
    Send files with Drag and Drop or header button
        How does it work:
            You cand drop files to the app either by drag and drop (gif)
            or by button in header section (gif)
        Realization:
            look at the architecture section(link)
    Send user text with footer text input
        How does it work:
            Just type your marvellous text in the footer text input (gif). 
        Realization:    
            Then it will be transformed in file Object (for the compatibility with other types of message) and sent to the server.
    Links recognition in user text
        How does it work:
            Just insert a linkable text in the text input and then it will be transformed in link. (gif)
        Realization:
            It's being parsed with regExp
    The possibility of downloading files by user
        How does it work:
            I guess it's kinda self-explanatory feature. But ok, here is the gif just in case (gif)
        Realization:
            When message is being rendered then it's download button initialised by link that equal with file url.

Aux Features
    Reading media (audio and video files)
        How does it work:
            Just click on the play button
        Realization:
            On media upload it's being parsed by file type. Then corresponding html markup is creating and url is being put in the src.
    Recording media with videoJs plugin
        How does it work:
            Each time when you click on a record button (video or audio) then it opens a recorder. (gif) 
            After that, you may choose whether you want to delete or send the audio(gif)
            Each recorder has itself max record time. When time's up it just stops the record.
        Realization:
            There's being used videoJs(link) package with Record plugin(link). On the record click it starts recording at the same time. Each time when a record stops previous record instances are being deleted and new ones are being created.
        Why it's so silly (non-obligatory to read):
            It maybe a little bit confusing but because of lack of documentaion I've had no idea what to do and I had to came up with this trick. The problem is that when you click on video record button it records video. But when you click again then it isn't being refreshed, yet instead it remembers the previous video and the video timer is being hidden. 
    Zip files when upload and unzip files on download from server:
        Realization: 
            There's being used jsZip package(link). 
            When user send data it is being zipped asynchronously in WebWorker and then sent to the server.
            When user get data from server then it is's being unzipped synchronously and then rendered.
    ServiceWorker implementation
        How does it work:
            After the first reload app save cache and then in case if you don't have network connection you will get your previous files. (gif)
        Realization:
            In case of lost connection client will send getAllFilesData request on server instead of ordinary getFilesData request. Then this request will be caught by ServiceWorker and it will take it's previous result from cache and send it back to the client side.
        

PS: A lot of features huh but in fact it's still a useless piece of s$$$. Anyway, who cares? Just let's move on.

Architecture (frontend) (actually it sucks)
    Project is distinguished on several parts:
        Components: parts of the bot (header, content, footer)
        Controller: module that binds all components together
        Lib: aux things - utils and template engine
        Request: api module for connection between server and client
        Service-worker: ServiceWorker itself (omg lmao)
        Upload: basically it is a structure, responding for file parsing. 
    The key idea there is to use closure in controller. Then this handler is imparted to all components. This handler either just render message or as well send it to the server. (If user upload data then bot render message and send file to the server, in case if it takes message from server then it just renderes message)

Architecture (backend) (sucks even more)
    Project is distinguished on several parts:
        Db: database module logic, contains lazyLoad logic, etc
        InitFiles: test file load (static)
        Public: files directory (static)
        Routes: Interaction with client requests
        ServerApp: App entry point, here starts server
    The key idea there is to use koa-multer and koa-body middlewares on different routes. When it gets fileData then it uses koa-body and when it gets file itself then it uses koa-multer to put file in public directory. (Actually, the key idea there is just to take some code from lection and if it works then it's already cool)

Plugins section

Installation
    If you want to run the application (you crazy or what) then you should separatelly load two git repos: this one (front) and this (back)(link). Then:
    In backend project you should start 'dev' script if you want to contribute. If you just want to run it then use 'start' script
    In frontend project you should use start script. (but before you need to build project with webpack with 'build' command). 





