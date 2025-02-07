/****************************************************************************
*
* Project: RDU Weather Visualization
*
****************************************************************************/

LIBNAME projects "/home/u63982526/Projects";

proc import datafile="/home/u63982526/Projects/RDU_Weather.csv"
		dbms=csv 
		out=rdu_weather replace;
	getnames=yes;
run;

data projects.rdu_weather; 
	set rdu_weather;
	
	rename 'TMAX (Degrees Fahrenheit)'n = tmax;
	rename 'TMIN (Degrees Fahrenheit)'n = tmin;
	rename 'PRCP (Inches)'n = prcp;
	rename 'SNOW (Inches)'n = snow;
	rename 'SNWD (Inches)'n = snwd;
	
	drop 'TAVG (Degrees Fahrenheit)'n;	
	
	year = year(date);
	day = day(date);
	month = month(date);
run;
	
data projects.rdu_weather;
	set projects.rdu_weather;
	label
		tmax = "Maximum Temperature (Degrees Fahrenheit)"
		tmin = "Minimum Temperature (Degrees Fahrenheit)"
		prcp = "Precipitation (Inches)"
		snow = "Snowfall (Inches)"
		snwd = "Snow Depth (Inches)"
		year = "Year";
	
	format date date9.;
run;

proc means data=projects.rdu_weather nway noprint;
	var snow;
	class year;
	output out=projects.year_snow_totals sum=snow_total;
run;

data projects.snowdays;
	set projects.rdu_weather;
	by year;
	retain snowdays;
	if first.year and snow > 0 then snowdays=1;
	else if first.year and snow = 0 then snowdays=0;
	else if snow > 0 then snowdays+1;
	if last.year then output;
	keep year snowdays;
	label snowdays = "Number of Days with Snowfall";
run;
	
ods graphics on / width = 12in;
ods graphics on / height = 5in;
ods graphics on / border=off;

title "Maximum Daily Temperature on July 4th";
proc sgplot data=projects.rdu_weather ;
	series x=year y=tmax / lineattrs=(color=lightred thickness=2);
	reg x=year y=tmax / nomarkers lineattrs=(pattern=dot);
	where day = 4 and month = 7;
run;

title "Minimum Daily Temperature on January 1st";
proc sgplot data=projects.rdu_weather;
	series x=year y=tmin / lineattrs=(color=blue thickness=2);
	reg x=year y=tmin / nomarkers lineattrs=(pattern=dot);
	where day = 1 and month = 1 and year > 1944;
run;

title "Total Snowfall per Year";
proc sgplot data=projects.year_snow_totals;
	vbar year / response=snow_total barwidth=.8 nooutline fillattrs=(color=lightblue);
	xaxis valuesrotate=vertical;
	where year > 1944;
run;

title "Days of Snowfall per Year";
proc sgplot data=projects.snowdays;
	vbar year / response=snowdays barwidth=0.8 nooutline fillattrs=(color=gray);
	xaxis valuesrotate=vertical;
	where year > 1944;
run;


	