# laundry-coms motivation

I live in an apartment complex with 20 units and 2 washing machines. There's been a number of times where I'd want to do my laundry, but someone else's laundry is still in the machine. I want to be courteous and wait 15 minutes before I even think about moving their clothes, but then I lose 15 minutes of laundry time. I personally avoid this by setting an alarm for 40 minutes so I know to come get my laundry when it is done. However, I know that not everyone does that and the urgency to get the clothes might not be that high.

This led me to come up with the idea of creating a simple application to track laundry and enable SMS to remind laundry retrieval. 

# Creating html page

It was easy to make the page and incorporate a timer that ticks from 35 minutes or 45 minutes based on the setting. However, the first issue that I ran into was making sure that the timer will remain running I leave the application. There are several reasons for this. First, the user is likely to not stay on the webpage after setting the timer, and secondly this will allow  other people to check the status of the laundry without having to physically go to the laundry room.

# Creating the timer

I created a separate javascript file to contain the two functions that start and reset the timers.

