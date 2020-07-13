class Api::Budget::V1::CategoryController < ApplicationController
  
  def index
    if current_user
      render json: current_user.categories
    else
      render json: {}
    end
  end
end