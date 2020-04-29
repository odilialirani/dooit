class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(username: params[:username])
   if @user && @user.authenticate(params[:password])
      sessions[:user_id] = @user.id
      redirect_to '/users'
   else
      redirect_to '/login'
   end
  end

  private
  
end
