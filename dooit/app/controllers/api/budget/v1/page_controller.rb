class Api::Budget::V1::PageController < ApplicationController

  def homepage
    if current_user
      render json: current_user.get_homepage_hash
    else
      render status: 401
    end
  end

  def add_spending
    if current_user
      spending = Budget::Spending.create(
        budget_id: params[:budget_id],
        amount: params[:amount],
        location: params[:location],
        date: params[:date]
      )

      render json: spending
    else
      render status: 401
    end
  end

  def add_category
    if current_user
      begin
        category = Budget::Category.create(
          title: params[:title],
          active: true,
          user: current_user
        )

        render json: category, status: 200
      rescue ActiveRecord::RecordInvalid => e
        render json: e, status: 400
      end
    else
      render status: 401
    end
  end

  def add_budget
    if current_user
      begin
         budget = Budget::Budget.create(
          user: current_user,
          category_id: params[:category],
          start_date: params[:start_date],
          end_date: params[:end_date],
          amount: params[:amount],
          active: true
        )

         render json: budget, status: 200
      rescue ActiveRecord::RecordInvalid => e
        render json: e, status: 400
      end
    else
      render status: 401
    end
  end
end