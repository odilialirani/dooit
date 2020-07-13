require 'aws-sdk'

module Split
  class Tesseract

    def initialize(receipt)
      @receipt = receipt
    end

    def process
      s3 = Aws::S3::Client.new
      object = s3.get_object(bucket: receipt.s3_bucket, key: receipt.s3_path)
      body = object.body.read

      # Run the gem
      

    end
    
    private

    def receipt
      @receipt || nil
    end
  end
end
