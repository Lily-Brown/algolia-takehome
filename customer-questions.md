## Question 1: 

Hello,

I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:

Records
Indexing
I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking."

Cheers, George

### Response

George,

Thanks for your inquiry. I would love to help you out with some of your inital questions.

1) What is Records Indexing?

In order to make your data available for search, we need to import it into Algolia. By creating an Index of your data, we are now able to query certain items -- like searching for Restaurant Names in a big data file that holds not only Names, but Addresses, Cuisine Type, Price Range, etc. 

You can easily import a new Index by going to your Dashboard and clicking on the Indices tab (photo of a database):

<img src="http://i.imgur.com/pcjHBJn.png" height=300px>

From there, click on the pink "+ NEW INDEX" button and specify a name for your Index.

Once the Index has been created, click on "UPLOAD FILE" from the right-hand "Add new records" menu, drop your file in the box and Upload File.

Let me know if you have any questions about that process.

2) What metrics are useful to include in "Custom Ranking"?

Custom Ranking allows you to control what record results are favored when your search results are displayed. Depending on the data you are searching through, Popularity is a handy metric to prioritize. 

If you add Popularity to you Custom Ranking Attributes (You can customize/add these from the Ranking tab on your Index view in your Dashboard), not only will relevant data be displayed when the user types/searches, but the data with the highest Popularity value will filter to the top.

You can read more about Custom Ranking here: https://www.algolia.com/doc/faq/index-configuration/what-should-i-set-in-the-custom-ranking/


I hope that I was able to answer a few of your onboarding questions but please let me know if you are unclear on anything or have any follow-up questions. I am here to make your life easier, so never hesitate to contact me.

Thanks,

Lily

## Question 2: 

Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Regards, Matt

### Response

Matt,

Thanks for your feedback. It is unforunate that our new design has caused you hiccups in your normal flow through our application. 

One thing to note about our redesign is that you are now able to view all indexes at the same time and make management decisions with the full scope of your data visualized.*

In terms of making your experience better, what kind of flow would be ideal for you? We are constantly improving and updating the dashboard and are excited to take your feedback and hopefully integrate it into future features?

Perhaps a 'Quick Delete' button from the Index tab?*

Let me know and I will be happy to check in with the development team and see what options are both feasible to implement and helpful to use.

Thanks,

Lily

_**Note:** I would try to point out the reasons behind the redesign and make sure the customer knows why we made the change. I was unable to view this page, however, because of a weird glitch. I have e-mailed you a video of what happened when I clicked on 'See more & manage.'_

_**Note:** I probably wouldn't suggest the 'Quick Delete' button if I knew it wasn't feasible. I may check with the Dashboard dev team to see if they had other suggestions as well._

## Question 3: 

Hi,

I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?

Regards, Leo

### Response

Leo,

Thanks for your interest in Algolia. 

At a high level, we would need to import your data, decide what information is useful/important for you to display and search on, customize your indexes to reflect those needs and then work with your front end to display the results in real-time.

We actually pride ourselves on how easy it is to integrate our search into your website, so I would be happy to sit down with you and better understand what aspects of Algolia you would like to add, utilize and take advantage of. In order to understand the complexity of the integration, we need to know not only what we're currently working with, but what our ultimate goal is for the project.

Let me know when you have time to sit down in person or over the phone to chat about this.

Thanks and chat soon,

Lily
