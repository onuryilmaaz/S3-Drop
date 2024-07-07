export default function Dashboard() {
  return <>
<section className="bg-gray-100 py-12">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="max-w-4xl mx-auto text-center lg:text-left">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">S3-Drop ile Paylaşım</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Dosya depolama ve kullanıcı yönetiminde AWS teknolojilerini kullanıyoruz. Dosyalarınızı güvenli şekilde saklamak için AWS S3, kullanıcı kaydı ve kimlik doğrulama işlemleri için ise AWS Cognito ve Amplify çözümlerini entegre ettik. Bu sayede, verilerinizi güvenli ve erişilebilir tutarken, kullanıcılarımıza hızlı ve güvenli bir kayıt deneyimi sunuyoruz.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">AWS S3</h3>
          <p className="text-gray-700">
            AWS S3, güvenli ve ölçeklenebilir bulut depolama çözümüdür. Dosyalarınızı yüksek güvenlik standartlarıyla saklar ve hızlı erişim sağlar.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">AWS Cognito</h3>
          <p className="text-gray-700">
            AWS Cognito, kullanıcı kimlik doğrulama ve yönetim hizmetidir. Kullanıcıların güvenli bir şekilde kaydolmasını, giriş yapmasını ve yetkilendirilmesini sağlar.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  </>;
}

