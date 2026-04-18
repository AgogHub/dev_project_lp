import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, CheckCircle2, Brain, Code, Clock, Users, ArrowRight, MapPin, BadgePercent, MessageCircle } from 'lucide-react'

const INDUSTRIES = [
    { value: 'manufacturing', label: '製造業' },
    { value: 'construction', label: '建設業' },
    { value: 'retail', label: '小売・卸売' },
    { value: 'food', label: '飲食・サービス' },
    { value: 'professional', label: '士業（税理士・社労士など）' },
    { value: 'agriculture', label: '農業・水産業' },
    { value: 'logistics', label: '運輸・物流' },
    { value: 'other', label: 'その他' },
] as const

function ThanksPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-6">
                    <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    お問い合わせありがとうございます
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    お問い合わせを受け付けました。<br />
                    担当者より2営業日以内にご連絡いたします。
                </p>
                <a
                    href={`${import.meta.env.BASE_URL}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                    トップページへ戻る
                </a>
            </div>
        </div>
    )
}

function App() {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        industry: '',
        message: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage('')

        try {
            const submitFormData = new FormData()
            submitFormData.append('company', formData.company)
            submitFormData.append('name', formData.name)
            submitFormData.append('email', formData.email)
            submitFormData.append('category', formData.industry)
            submitFormData.append('message', formData.message)

            const response = await fetch(`${import.meta.env.BASE_URL}api/contact.php`, {
                method: 'POST',
                body: submitFormData,
            })

            const data = await response.json()

            if (data.success) {
                if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
                    (window as any).fbq('track', 'Lead')
                }
                window.location.href = `${import.meta.env.BASE_URL}index.html?thanks=1`
                return
            } else {
                setSubmitMessage(data.message || '送信に失敗しました。しばらく時間をおいて再度お試しください。')
            }
        } catch (error) {
            setSubmitMessage('送信に失敗しました。しばらく時間をおいて再度お試しください。')
        } finally {
            setIsSubmitting(false)
        }
    }

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact')
        contactSection?.scrollIntoView({ behavior: 'smooth' })
    }

    const isThanksPage = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('thanks') === '1'
    if (isThanksPage) {
        return <ThanksPage />
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <section className="bg-blue-900 overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row min-h-[480px]">
                    {/* 左：テキストパネル */}
                    <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-16 md:py-20">
                        {/* バッジ */}
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-white/10 border border-white/20 text-blue-100 rounded-md text-sm font-medium w-fit">
                            IT導入補助金 2026年度 申請支援受付中
                        </div>

                        {/* メインヘッドライン */}
                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-tight mb-6">
                            もう、手作業に<br />
                            <span className="text-orange-400">追われなくていい。</span>
                        </h1>

                        <p className="text-blue-200 text-lg leading-relaxed mb-10 max-w-md">
                            中小企業のAI導入を、<br className="hidden md:block" />
                            相談から実装まで一気通貫でサポート。
                        </p>

                        {/* CTA */}
                        <div>
                            <Button
                                onClick={scrollToContact}
                                size="lg"
                                className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-6 text-lg font-bold rounded-lg shadow-lg transition-all"
                            >
                                まず30分、無料で相談する
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                            <p className="text-blue-400 text-sm mt-3">
                                ※ 初回相談は無料。全国の中小企業様歓迎。
                            </p>
                        </div>
                    </div>

                    {/* 右：画像パネル（md以上で表示） */}
                    <div className="hidden md:block w-[45%] relative flex-shrink-0">
                        <img
                            src={`${import.meta.env.BASE_URL}teamwork.jpg`}
                            alt="業務改善のイメージ"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* 左フェード（写真とナビーの境界を自然につなぐ） */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-blue-900 to-transparent" />
                    </div>
                </div>
            </section>

            {/* 実績・信頼バー */}
            <section className="bg-blue-900 text-white py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Users className="w-5 h-5 text-blue-300" />
                            </div>
                            <p className="text-3xl font-bold text-white">20社+</p>
                            <p className="text-sm text-blue-300 mt-1">導入支援実績</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <BadgePercent className="w-5 h-5 text-blue-300" />
                            </div>
                            <p className="text-3xl font-bold text-white">最大75%</p>
                            <p className="text-sm text-blue-300 mt-1">IT導入補助金 補助率</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Clock className="w-5 h-5 text-blue-300" />
                            </div>
                            <p className="text-3xl font-bold text-white">30分</p>
                            <p className="text-sm text-blue-300 mt-1">初回無料相談</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <MapPin className="w-5 h-5 text-blue-300" />
                            </div>
                            <p className="text-3xl font-bold text-white">全国</p>
                            <p className="text-sm text-blue-300 mt-1">対応エリア（リモート可）</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 課題セクション */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        こんなお悩みはありませんか？
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        みなさんから、よくいただく声です。
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* 悩み1 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}overwhelmed.jpg`}
                                alt="パソコンの前で悩む経営者"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-base font-bold text-gray-900 mb-1.5">何から始めればいいかわからない</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    ChatGPTは使ってみた。でも業務に組み込む方法がわからない。
                                </p>
                            </div>
                        </div>

                        {/* 悩み2 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}financial_stress.jpg`}
                                alt="コストを気にして書類を見る経営者"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-base font-bold text-gray-900 mb-1.5">費用が高そうで動けない</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    ITツールの導入費用が不安。補助金が使えると聞いたが申請が難しそう。
                                </p>
                            </div>
                        </div>

                        {/* 悩み3 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}contemplation.jpg`}
                                alt="一人でデスクに向かう経営者"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-base font-bold text-gray-900 mb-1.5">相談できる人がいない</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    大手ITベンダーは中小企業を相手にしてくれない。身近に頼れる専門家がいない。
                                </p>
                            </div>
                        </div>

                        {/* 悩み4 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}unused.jpg`}
                                alt="ツールが使われていない職場"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-base font-bold text-gray-900 mb-1.5">導入したが現場で使われない</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    ツールを入れたが定着しない。現場の運用まで一緒に考えてほしい。
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <p className="text-gray-700 text-lg font-semibold">
                            その悩み、私が一緒に解決します。まず30分、話してみてください。
                        </p>
                        <Button
                            onClick={scrollToContact}
                            size="lg"
                            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-base font-bold shadow-md"
                        >
                            無料相談を申し込む
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* サービスセクション */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        サービスメニュー
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        「まず話を聞きたい」から「実装まで任せたい」まで、段階に応じて選べます。
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* スポット診断 */}
                        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg border border-blue-100 flex flex-col">
                            <div className="mb-4">
                                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <MessageCircle className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">スポット診断コンサル</h3>
                                <p className="text-2xl font-bold text-blue-700 mb-4">5万円〜 / 回</p>
                            </div>
                            <ul className="space-y-2 text-gray-700 flex-1">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>業務ヒアリング（2〜3時間）</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>AI活用診断レポート納品</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>補助金活用シミュレーション</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>導入ロードマップ作成</span>
                                </li>
                            </ul>
                        </div>

                        {/* AI導入顧問 */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 shadow-xl text-white flex flex-col relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full shadow">
                                    人気
                                </span>
                            </div>
                            <div className="mb-4">
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                    <Brain className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">AI導入顧問契約</h3>
                                <p className="text-2xl font-bold text-yellow-300 mb-4">月15万円〜 / 社</p>
                            </div>
                            <ul className="space-y-2 text-blue-100 flex-1">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                                    <span>月次MTG・進捗管理</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                                    <span>補助金申請書類の作成支援</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                                    <span>AIツール・業務システムの要件定義</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                                    <span>実装〜現場定着まで伴走</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                                    <span>チャット相談（平日対応）</span>
                                </li>
                            </ul>
                        </div>

                        {/* 業務アプリ開発 */}
                        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg border border-blue-100 flex flex-col">
                            <div className="mb-4">
                                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Code className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">業務アプリ開発</h3>
                                <p className="text-2xl font-bold text-blue-700 mb-4">要見積</p>
                            </div>
                            <ul className="space-y-2 text-gray-700 flex-1">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>要件定義・UI設計</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>モバイル / Web アプリ開発</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>AI機能（自動化・分析）の組み込み</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>IT補助金を使った開発も可</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 補助金セクション */}
            <section className="py-16 md:py-20 px-4 bg-blue-900 text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        IT導入補助金で導入コストを最大75%削減
                    </h2>
                    <p className="text-center text-blue-200 mb-12 text-lg leading-relaxed">
                        国の補助金を活用すれば、実質負担を大幅に下げてAI導入が可能です。<br />
                        申請書類の作成もサポートします。
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                            <div className="text-yellow-300 text-sm font-bold mb-2 uppercase tracking-wide">通常枠</div>
                            <p className="text-3xl font-bold text-white mb-1">最大50%</p>
                            <p className="text-blue-200 text-sm mb-3">上限 450万円</p>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                ITツール・ソフトウェアの導入費用に適用できる基本的な補助枠。
                            </p>
                        </div>
                        <div className="bg-yellow-400/20 rounded-xl p-6 border border-yellow-400/40">
                            <div className="text-yellow-300 text-sm font-bold mb-2 uppercase tracking-wide">デジタル化基盤導入枠</div>
                            <p className="text-3xl font-bold text-white mb-1">最大75%</p>
                            <p className="text-blue-200 text-sm mb-3">上限 350万円</p>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                会計・受発注・決済などのデジタル化に特化した高補助率の枠。
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                            <div className="text-yellow-300 text-sm font-bold mb-2 uppercase tracking-wide">申請支援</div>
                            <p className="text-xl font-bold text-white mb-2">まるごとお任せ</p>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                申請書類の作成・gBizIDの取得サポートまで一緒に対応します。
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <Button
                            onClick={scrollToContact}
                            size="lg"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-base font-bold shadow-md"
                        >
                            補助金の活用可否を無料で確認する
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* 支援の流れセクション */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        支援の流れ
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                1
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">無料相談（30分）</h3>
                                <p className="text-gray-600">現状の課題・やりたいことをヒアリング。補助金の活用可否もお伝えします。</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                2
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">AI活用診断・提案</h3>
                                <p className="text-gray-600">業務フローを整理し「何をAIに任せるか」を優先度付きで提案します。</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                3
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">補助金申請サポート</h3>
                                <p className="text-gray-600">IT導入補助金など活用できる補助金を特定し、書類作成を支援します。</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                4
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">導入・実装</h3>
                                <p className="text-gray-600">AIツールの設定から業務アプリの開発まで、エンジニアとして実装まで担当します。</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                5
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">定着・改善サポート</h3>
                                <p className="text-gray-600">現場での使い方レクチャー、改善ループのサポート。顧問契約で継続伴走も対応します。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* プロフィールセクション */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        プロフィール
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/3 bg-blue-50 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <img
                                        src={`${import.meta.env.BASE_URL}profile-image.png`}
                                        alt="水木 大悟"
                                        className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-4"
                                    />
                                    <p className="font-bold text-gray-900 text-lg">水木 大悟</p>
                                    <p className="text-blue-700 text-sm font-medium mt-1">
                                        中小企業AI導入支援 / PM × エンジニア
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-2/3 p-8">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    受託コンサル・事業会社でのPM経験を経て、現在は中小企業向けのAI導入支援を専門とする。
                                    Flutterを中心にモバイル・WebアプリをスピードでAI機能付きで開発できる強みを活かし、
                                    要件定義から実装まで一気通貫で対応。補助金活用支援も含め、
                                    コスト効率の高いDX推進を全国の中小企業・士業事務所へ提供している。
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['PM / プロダクト設計', 'Flutter開発', 'AI実装', '受託コンサル経験', 'IT補助金支援'].map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <p className="text-blue-900 text-sm leading-relaxed font-medium">
                                        営業時間：平日9:00〜18:00（土日祝お休み）<br />
                                        対応エリア：全国（オンライン中心、必要に応じて訪問対応可）
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* お客様の声セクション */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        お客様の声
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-lg shadow-sm p-8">
                            <div className="mb-4">
                                <div className="flex text-yellow-400 mb-2">
                                    {'★★★★★'.split('').map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                「補助金を使って請求書の自動処理システムを導入できました。
                                月20時間以上かかっていた作業が3時間に。補助金の申請から全部サポートしてもらえたので、
                                私たちは何も難しいことをせずに済みました。」
                            </p>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="font-semibold text-gray-900">建設業 A社</p>
                                <p className="text-sm text-gray-600">代表取締役 様</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg shadow-sm p-8">
                            <div className="mb-4">
                                <div className="flex text-yellow-400 mb-2">
                                    {'★★★★★'.split('').map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                「AIって難しそう…と思っていましたが、現場の言葉で丁寧に説明してもらえて、
                                スタッフも含めてスムーズに使い始められました。顧問として継続的に見てもらえるのが安心です。」
                            </p>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="font-semibold text-gray-900">士業事務所 B所</p>
                                <p className="text-sm text-gray-600">所長 様</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg shadow-sm p-8 md:col-span-2">
                            <div className="mb-4">
                                <div className="flex text-yellow-400 mb-2">
                                    {'★★★★★'.split('').map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                「スポット診断だけでも十分な価値がありました。自社の業務のどこにAIを使えばいいか整理できて、
                                補助金で費用もほぼカバーできる見通しが立ちました。そのままIT導入補助金の申請もお願いしています。」
                            </p>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="font-semibold text-gray-900">飲食・サービス C社</p>
                                <p className="text-sm text-gray-600">経営者 様</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQセクション */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        よくある質問
                    </h2>
                    <div className="space-y-4">
                        <details className="bg-white rounded-lg p-6 cursor-pointer shadow-sm">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                地方にいますが対応してもらえますか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                はい、全国対応可能です。基本的にはオンライン（Zoom等）でのご支援となりますが、
                                必要に応じて訪問対応も承ります（別途交通費）。
                            </p>
                        </details>
                        <details className="bg-white rounded-lg p-6 cursor-pointer shadow-sm">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                IT導入補助金の申請は難しいですか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                書類作成や手続きのサポートを行いますのでご安心ください。
                                まずは無料相談で、貴社が対象となる補助金をご確認いただくことをお勧めします。
                            </p>
                        </details>
                        <details className="bg-white rounded-lg p-6 cursor-pointer shadow-sm">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                AIについて全く知識がなくても大丈夫ですか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                もちろんです。「AIって何？」という段階からでも丁寧にご説明します。
                                専門用語を使わず、現場目線でわかりやすくお伝えします。
                            </p>
                        </details>
                        <details className="bg-white rounded-lg p-6 cursor-pointer shadow-sm">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                スポットと顧問、どちらが向いていますか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                「まず何ができるか知りたい」という方にはスポット診断がお勧めです。
                                具体的な導入・実装を進めたい方には顧問契約が向いています。
                                最初のスポット相談後に最適なプランをご提案します。
                            </p>
                        </details>
                        <details className="bg-white rounded-lg p-6 cursor-pointer shadow-sm">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                開発（アプリ制作）だけ依頼できますか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                はい、開発単体のご依頼も可能です。ただし、要件定義から入ることで開発品質と
                                現場定着率が高まるため、上流からの関与をお勧めしています。
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* 最終CTA・問い合わせフォームセクション */}
            <section id="contact" className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        まず30分、話してみてください。
                    </h2>
                    <p className="text-center text-gray-600 mb-2">
                        費用・補助金・導入イメージ — 何でもお気軽にご相談ください。
                    </p>
                    <p className="text-center text-blue-600 font-semibold mb-12">
                        押し売りは一切ありません。初回相談は無料です。
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-6"
                    >
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                会社名・屋号 <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="company"
                                name="company"
                                type="text"
                                required
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="株式会社〇〇 / ○○事務所"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                お名前 <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="山田 太郎"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                メールアドレス <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="example@company.com"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                                業種 <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="industry"
                                name="industry"
                                required
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">選択してください</option>
                                {INDUSTRIES.map((ind) => (
                                    <option key={ind.value} value={ind.value}>
                                        {ind.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                ご相談内容（任意）
                            </label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="「AIで〇〇を自動化したい」「補助金が使えるか知りたい」など、どんな内容でもお気軽にどうぞ"
                                rows={6}
                                className="w-full"
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg disabled:opacity-50 font-bold"
                        >
                            {isSubmitting ? '送信中...' : '無料相談を申し込む'}
                        </Button>
                        {submitMessage && (
                            <p className={`text-sm text-center ${submitMessage.includes('受け付けました') ? 'text-green-600' : 'text-red-600'}`}>
                                {submitMessage}
                            </p>
                        )}
                        <p className="text-xs text-gray-500 text-center">
                            送信いただいた内容は、プライバシーポリシーに基づいて適切に管理いたします。
                        </p>
                    </form>
                </div>
            </section>

            {/* フッター */}
            <footer className="bg-gray-900 text-gray-400 py-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="font-semibold text-white mb-2">株式会社Agog</p>
                    <p className="text-sm mb-1">中小企業AI導入支援 / IT導入補助金申請サポート</p>
                    <p className="text-sm">
                        © 2026 Agog Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
