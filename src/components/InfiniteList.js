import React, { useEffect, useState } from "react";
import { getData } from "../infiniteService";
import { Grid, Typography, Divider } from "@material-ui/core";
import { QuestionCard } from "./reuseable/QuestionCard";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { AlertMessage } from "./reuseable/AlertMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
  },
  singleRow: {
    padding: "2px",
    "&:hover": {
      backgroundColor: "#f8f5f1",
      cursor: "pointer",
    },
  },
  listHeader: {
    margin: "10px",
  },
  hyperLink: { textDecoration: "none", color: "#000" },
}));

export const InfiniteList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [quotaMax, setQuotaMax] = useState(2);
  const [quotaRemaining, setQuotaRemaining] = useState(1);

  //alertBox
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    if (hasMore === true && quotaRemaining < quotaMax) {
      //then only call api to fetch data
      setLoading(true);
      let result = await getData(page, limit);
      setLoading(false);
      if (result.success) {
        setPage(page + 1);
        setHasMore(result.data.has_more);
        setQuotaMax(result.data.quota_max);
        setQuotaRemaining(result.data.quota_remaining);
        let prevQuestions = [...questions];
        Array.prototype.push.apply(prevQuestions, result.data.items);
        setQuestions(prevQuestions);
      } else {
        setOpen(true);
        setMessage(result.message);
      }
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        StackOverflow Questions
      </Typography>
      <Grid container className={classes.listHeader}>
        <Grid item md={4} xs={12}>
          <Typography variant="h6">Author</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="h6">Title</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="h6">Creation Date</Typography>
        </Grid>
      </Grid>

      <InfiniteScroll
        dataLength={questions.length}
        next={fetchQuestions}
        hasMore={hasMore}
        loader={loading && <h4>Loading ... </h4>}
      >
        {questions.map((question, index) => (
          <div key={index} className={classes.singleRow}>
            <a
              className={classes.hyperLink}
              href={question.link}
              target="_blank"
              rel="noreferrer"
            >
              <QuestionCard question={question} />
            </a>

            <Divider />
          </div>
        ))}
      </InfiniteScroll>
      {loading === false && questions.length === 0 && (
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          No Data Available!
        </Typography>
      )}
      <AlertMessage open={open} handleClose={handleClose} message={message} />
    </div>
  );
};
