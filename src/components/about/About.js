import React from "react";
import { Paper, Grid, Typography, Link, List, ListItem, ListItemAvatar } from "@material-ui/core";
import { EmojiPeople, LockOutlined, LockOpenOutlined } from "@material-ui/icons";
import SourceLink from "./SourceLink";
import CostumDivider from "./CostumDivider";

function About() {
  return (
    <Paper elevation={6} square style={{ margin: 10, padding: 20 }}>
      <Typography variant="subtitle1" component="div" style={{ fontWeight: "bold" }}>
        Hi there! <EmojiPeople style={{ marginBottom: -2 }} color="primary" />
      </Typography>
      <Typography variant="body2" style={{ marginTop: 20 }}>
        I am Anush. Thanks for visiting Real Home! <br />
        To get the full experience, please register or sign in with the
        following credentials:
        <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: 20, marginLeft: 21 }}>
          Username: anna <br />
          Password: anna2021
        </Typography>
        If something breaks down or does not work properly, and you feel like
        letting me know about it, please email me at <Link>anushhambaryan@gmail.com</Link>.
      </Typography>

      <CostumDivider />

      <Typography variant="body2" component="div">
        I built this website to teach myself
        {" "}<Link href="https://reactjs.org/">React</Link>,
        {" "}<Link href="https://www.django-rest-framework.org/">Django REST framework</Link>, 
        and to work with Google Maps. <br />
        The concept was inspired by
        {" "}<Link href="https://www.zillow.com/">Zillow</Link>,
        {" "}<Link href="https://www.airbnb.com/">Airbnb</Link>, and
        {" "}<Link href="https://www.list.am/">List.am</Link>. <br />
        It is a platform where:
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <LockOpenOutlined fontSize="small" color="primary" />
            </ListItemAvatar>
            Registered users can add real estate for sale or rent, view, edit
            and delete their own listings
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <LockOutlined fontSize="small" color="primary" />
            </ListItemAvatar>
            Unregistered users can only visit the Home page to search for
            listings utilizing the filters
          </ListItem>
        </List>
        I restricted the area to Yerevan to keep things simple. The website has
        quite a bit of functionality, but it is by no means fully functional or
        optimal for use. I wanted to learn how to build some core features but
        did not aim to create a production-ready project.
        <br />
      </Typography>

      <Typography
        variant="body2"
        style={{ marginTop: 20, fontStyle: "italic" }}
      >
        The existing listings are not real properties, their data are made up
        for demonstration purposes. Some of the listings have a real address
        that I found just by randomly clicking here and there on Google Map. The
        markers of those addresses accurately point to the relevant location.
        However, for a lot of them, the street is real, but the building number
        is a random number so the exact address might not exist, and the
        corresponding marker might point to a nonsensical location, e.g. an
        intersection.
      </Typography>

      <CostumDivider />

      <Typography variant="body2" style={{ fontWeight: "bold" }}>
        Technology Stack
      </Typography>

      <Grid container style={{ fontSize: 14 }}>
        <Grid item xs={12} sm={4} md={3}>
          <List dense>
            <ListItem style={{ fontWeight: "bold" }}>Back end</ListItem>
            <ListItem>
              <Link href="https://www.djangoproject.com/">Django</Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.django-rest-framework.org/">Django REST framework</Link>
            </ListItem>
            <ListItem>
              <Link href="https://james1345.github.io/django-rest-knox/">Django-Rest-Knox</Link>
            </ListItem>
            <ListItem>
              <Link href="https://pypi.org/project/django-imagekit/">django-imagekit</Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <List dense>
            <ListItem style={{ fontWeight: "bold" }}>Front end</ListItem>
            <ListItem>
              <Link href="https://reactjs.org/">React</Link>
            </ListItem>
            <ListItem>
              <Link href="https://material-ui.com/">Material-UI</Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.npmjs.com/package/google-map-react">google-map-react</Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.npmjs.com/package/react-geocode">react-geocode</Link>
            </ListItem>
            <ListItem>
              <Link href="https://reactrouter.com/">React Router</Link>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <CostumDivider />

      <Typography variant="body2" component="div">
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Image sources
        </Typography>
        <List dense>
          <SourceLink link="https://pixabay.com/" />
          <SourceLink link="https://www.freepik.com/" />
          <SourceLink link="https://www.pexels.com/" />
          <SourceLink link="https://unsplash.com/" />
          <SourceLink link="https://www.designfixhome.com/" />
          <SourceLink link="http://everyday-modern.com/" />
          <SourceLink link="https://www.criticalshots.com/" />
          <SourceLink link="https://www.apartments.com/" />
          <SourceLink link="https://www.rentthepalms.com/" />
        </List>

        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Listing description sources
        </Typography>
        <List dense>
          <SourceLink link="https://eatsleepwander.com/airbnb-description-examples/" />
          <SourceLink link="https://www.apartments.com/rental-manager/resources/article/writing-tips-for-a-mind-blowing-property-description" />
          <SourceLink link="https://hooquest.com/listing-descriptions/" />
          <SourceLink link="https://copycatchy.com/real-estate-description-examples/" />
          <SourceLink link="https://managecasa.com/articles/epic-guide-to-writingrentalads/" />
          <SourceLink link="http://www.jdpdx.com/wp-content/uploads/2014/12/House-Ad-Sample.pdf" />
        </List>
      </Typography>
    </Paper>
  );
}

export default About;
