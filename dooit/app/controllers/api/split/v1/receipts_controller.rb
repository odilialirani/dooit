class Api::Split::V1::ReceiptsController < ApplicationController
  def upload
    receipt = Receipt.create(
      s3_bucket: params[:s3_bucket],
      s3_path: params[:s3_path]
    )
  end

  def create

  end

  def split

  end

  private

  def receipts_params

  end

end
