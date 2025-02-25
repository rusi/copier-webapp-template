from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()
# scheduler.add_job(lambda: asyncio.run(function_to_run_regularly()), "cron", hour=8, minute=0)
# scheduler.add_job(function_to_run_every_minute, "interval", minutes=1)


def start_scheduler() -> None:
    """Start the scheduler."""
    scheduler.start()


def stop_scheduler() -> None:
    """Stop the scheduler."""
    scheduler.shutdown()
