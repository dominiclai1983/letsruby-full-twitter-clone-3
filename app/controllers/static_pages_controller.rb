class StaticPagesController < ApplicationController

  def home
    render 'home'
  end

  def signup
    redirect_to '/'
  end

  def login
    sleep(0.5)
    redirect_to '/tweet'
  end

  def tweet
    render 'tweet'
  end

end
