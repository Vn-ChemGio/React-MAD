let classes ={}
export default <div className={classes.main}>
  <Card className={classes.card}>
    <div className={classes.avatar}>
      <Avatar className={classes.icon}>
        <LockIcon />
      </Avatar>
    </div>
    <form onSubmit={handleSubmit(this.login)}>
      <div className={classes.hint}>Hint: demo / demo</div>
      <div className={classes.form}>
        <div className={classes.input}>
          <Field
              autoFocus
              name="username"
              component={renderInput}
              label={translate('ra.auth.username')}
              disabled={isLoading}
          />
        </div>
        <div className={classes.input}>
          <Field
              name="password"
              component={renderInput}
              label={translate('ra.auth.password')}
              type="password"
              disabled={isLoading}
          />
        </div>
      </div>
      <CardActions className={classes.actions}>
        <Button
            variant="raised"
            type="submit"
            color="primary"
            disabled={isLoading}
            className={classes.button}
            fullWidth
        >
          {isLoading && (
              <CircularProgress size={25} thickness={2} />
          )}
          {translate('ra.auth.sign_in')}
        </Button>
      </CardActions>
    </form>
  </Card>
  <Notification />
</div>